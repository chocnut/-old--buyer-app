import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Text
} from "react-native";
import RequestCard from "../../components/RequestCard";
import Tabs from "../../components/Tabs";
import LogoTitle from "../../components/LogoTitle";
import HeaderBtn from "../../components/HeaderBtn";
import EmptyState from "../../components/EmptyState";
import MasterAddBtn from "../../components/MasterAddBtn";
import MediaWizard from "../../components/MediaWizard";
import RequestSearch from "./RequestSearch";
import styles from "./RequestsScreenStyles";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import layout from "../../constants/Layout";
// import firebase from "react-native-firebase";
import api from "../../api";

@observer
export default class RequestsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const rightButton = (
      <HeaderBtn
        title="Search"
        onPress={navigation.getParam("searchHandler")}
        image={require("../../assets/images/search.png")}
        style={{ position: "absolute", right: 8, top: 8, left: "auto" }}
      />
    );

    return {
      headerTitle: <LogoTitle rightButton={rightButton} />
    };
  };

  state = {
    mode: "draft",
    addBtnMenuVisible: false,
    mediaWizardVisible: false,
    mediaSource: "library",
    showSearch: false
  };

  componentDidMount = async () => {
    this.rowOpacity = new Animated.Value(1);

    //this.showAlert = this.props.screenProps.showAlert;
    //this.closeAlert = this.props.screenProps.closeAlert;
    // this.handleError = this.props.screenProps.handleError;
    // this.setLoading = this.props.screenProps.setLoading;
    // this.store = this.props.screenProps.appStore;

    this.deviceIsIphoneX = this.store.deviceIsIphoneX;

    this.props.navigation.setParams({
      searchHandler: () => this.setState({ showSearch: true })
    });

    let user = { name: "unknown", email: "unknown" };
    try {
      const res = await this.store.getUser(this.store.auth);
      user = res.data.attributes;
      // firebase.crashlytics().log(JSON.stringify(user))
      // firebase.crashlytics().recordError(9, 'GOT THE USER')
    } catch (e) {
      console.log(e);
      api.postToSlack(JSON.stringify(e), "Error", user);
      //firebase.crashlytics().log(JSON.stringify(e));
      //firebase.crashlytics().recordError(1, "Error getting user");
    }

    await this.refresh();

    this.changeMode("draft");
  };

  componentWillReceiveProps = newProps => {
    if (newProps.navigation && newProps.navigation.getParam("tab")) {
      const mode = newProps.navigation.getParam("tab") || "draft";
      this.changeMode(mode);
    }
  };

  refresh = async () => {
    try {
      await this.store.getRequests();
      await this.store.getUserMedia();
    } catch (e) {
      // this.handleError(e)
      //firebase.crashlytics().log(JSON.stringify(e));
      //firebase.crashlytics().recordError(2, "Error refreshing data");
      api.postToSlack(JSON.stringify(e), "Error");
    }
  };

  changeMode = async mode => {
    const requests = mode === "draft" ? this.store.drafts : this.store.sent;

    /*
    if (requests && requests.length) {
      await this.rowOpacity.setValue(0);
      Animated.timing(this.rowOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200
      }).start();
    }
    */

    this.setState({ mode });
  };

  confirmDelete = async id => {
    await this.showAlert({
      visible: true,
      image: require("../../assets/images/trash.png"),
      title: "Delete",
      body: "Are you sure you want to delete this draft request?",
      btnText: "Delete",
      secondaryText: "Cancel",
      onClose: this.closeAlert,
      onAccept: () => this.dispatchDeleteRequest(id),
      allowClose: false
    });
  };

  dispatchDeleteRequest = async id => {
    try {
      await this.store.deleteRequest(id);
      await this.store.getRequests();
      this.closeAlert();
    } catch (e) {
      this.handleError(e);
    }
  };

  viewDetail = async request => {
    await this.store.setCurrentRequest(request);
    this.props.navigation.navigate("RequestWizard", {
      viewIndex: 3,
      request_sent: request.attributes.sent_at
    });
  };

  newRequest = async getMediaFrom => {
    try {
      await this.store.setCurrentRequest();
    } catch (e) {
      console.log(e);
    }

    if (getMediaFrom) {
      setTimeout(async () => {
        await this.setState({
          mediaSource: getMediaFrom,
          mediaWizardVisible: true
        });
      }, 500);
    } else {
      this.props.navigation.navigate("RequestWizard", {
        viewIndex: 0,
        request_sent: false
      });
    }
  };

  toggleAddButtonMenu = () => {
    this.setState({ addBtnMenuVisible: !this.state.addBtnMenuVisible });
  };

  addMedia = async media => {
    this.setState({ mediaWizardVisible: false });
    await this.store.setCurrentRequest(null, media);
    this.props.navigation.navigate("RequestWizard", {
      viewIndex: 0,
      request_sent: false
    });
  };

  cancelAddMedia = () => {
    this.setState({ mediaWizardVisible: false });
  };

  renderEmptyState = () => {
    if (this.store && !this.store.requestIds.length) {
      return (
        <EmptyState
          image={require("../../assets/images/folder.png")}
          heading="Create new request"
          body="Please press the plus button to create your first request"
        />
      );
    }

    return null;
  };

  renderData = data => {
    if (this.store && this.store.requestIds.length) {
      return (
        <View>
          <Tabs changeMode={this.changeMode} mode={this.state.mode} />

          <AnimatedFlatList
            data={toJS(data)}
            renderItem={({ item }) => this.renderRequest(item)}
            keyExtractor={item => item.id}
            refreshing={false}
            onRefresh={this.refresh}
            numColumns={2}
            contentContainerStyle={[
              styles.flatList,
              { opacity: this.rowOpacity }
            ]}
          />
        </View>
      );
    }

    return null;
  };

  renderRequest = request => {
    const media = this.store.media[request.id];
    return (
      <View style={{ width: "50%" }}>
        <RequestCard
          request={request}
          media={media}
          allowDelete={this.state.mode === "draft"}
          delete={this.confirmDelete}
          onPress={this.viewDetail}
        />
      </View>
    );
  };

  render() {
    const drafts = this.store ? this.store.drafts : [];
    const sent = this.store ? this.store.sent : [];
    const data = this.state.mode === "draft" ? drafts : sent;
    const menuVisible = this.state.addBtnMenuVisible;
    const requests = this.store ? this.store.requests : {};
    const media = this.store ? this.store.media : {};

    return (
      <View style={styles.container}>
        <MediaWizard
          visible={this.state.mediaWizardVisible}
          onSave={this.addMedia}
          source={this.state.mediaSource}
          onCancel={this.cancelAddMedia}
          deviceIsIphoneX={this.deviceIsIphoneX}
          showAlert={this.showAlert}
          closeAlert={this.closeAlert}
        />

        {this.renderEmptyState()}
        {this.renderData(data)}

        <MasterAddBtn
          visible={menuVisible}
          onClose={this.toggleAddButtonMenu}
          action={this.newRequest}
        />

        <TouchableOpacity
          style={[styles.addBtn]}
          activeOpacity={1}
          onPress={this.toggleAddButtonMenu}
        >
          <Image
            source={require("../../assets/images/add.png")}
            style={styles.plus}
          />
        </TouchableOpacity>

        <RequestSearch
          visible={this.state.showSearch}
          viewDetail={this.viewDetail}
          requests={requests}
          media={media}
          onClose={() => this.setState({ showSearch: false })}
          navigation={this.props.navigation}
          deviceIsIphoneX={this.deviceIsIphoneX}
        />

        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
