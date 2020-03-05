import React from "react";
import { observer } from "mobx-react";
import EewooInput from "../../components/EewooInput";
import HeaderBtn from "../../components/HeaderBtn";
import RequestCard from "../../components/RequestCard";
import { toJS } from "mobx";
import { StyleSheet, View, Text, FlatList, StatusBar } from "react-native";
import colors from "../../constants/Colors";
import Modal from "react-native-modal";

@observer
export default class RequestSearch extends React.Component {
  state = {
    search_term: "",
    filteredRequests: [],
    ready: false
  };

  componentDidMount() {
    this.setState({ ready: true });
  }

  componentWillReceiveProps = newProps => {
    if (
      this.state.ready &&
      newProps.requests &&
      newProps.requests !== this.props.requests
    ) {
      const requestClone = JSON.parse(JSON.stringify(toJS(newProps.requests)));
      this.setState({ filteredRequests: requestClone });
    }
  };

  handleSearch = search_term => {
    const term = search_term.toLowerCase();

    const filteredRequests = this.props.requests.filter(r => {
      const title_match =
        r.attributes.title && r.attributes.title.toLowerCase().includes(term);
      const desc_match =
        r.attributes.description &&
        r.attributes.description.toLowerCase().includes(term);
      return title_match || desc_match;
    });

    this.setState({ search_term, filteredRequests });
  };

  viewDetail = async request => {
    this.props.onClose();
    this.props.viewDetail(request);
  };

  renderRequest = request => {
    const media = this.props.media[request.id];
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
    const results = this.state.filteredRequests;

    return (
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropColor="transparent"
        animationInTiming={400}
        animationOutTiming={400}
        backdropOpacity={1}
        isVisible={this.props.visible}
        style={{ margin: 0 }}
      >
        <View
          style={[
            styles.container,
            this.props.deviceIsIphoneX && styles.headerLarge
          ]}
        >
          <View style={{ paddingHorizontal: 6 }}>
            <EewooInput
              placeholder="Search"
              value={this.state.search_term}
              onChange={search_term => this.handleSearch(search_term)}
              styleObject={{
                fontSize: 24,
                fontFamily: "Quicksand-Medium",
                paddingBottom: 6
              }}
            />
            <Text style={styles.count}>
              {results.length ? results.length : "No"} result
              {results.length !== 1 && "s"}
            </Text>
          </View>

          <HeaderBtn
            title="Back"
            onPress={this.props.onClose}
            image={require("../../assets/images/close_dark.png")}
            style={[
              styles.close,
              this.props.deviceIsIphoneX && styles.closeLarge
            ]}
          />

          <FlatList
            data={this.state.filteredRequests}
            renderItem={({ item }) => this.renderRequest(item)}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            refreshing={false}
            numColumns={2}
            contentContainerStyle={styles.flatList}
          />

          <StatusBar barStyle="dark-content" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 9,
    position: "relative",
    marginTop: -18,
    backgroundColor: "white"
  },
  headerLarge: {
    paddingTop: 25
  },
  close: {
    position: "absolute",
    right: 8,
    top: 48,
    left: "auto"
  },
  closeLarge: {
    top: 73
  },
  count: {
    fontSize: 14,
    fontFamily: "Quicksand-Regular",
    color: colors.graphite,
    marginTop: 5,
    marginBottom: 20
  },
  flatList: {
    paddingTop: 12,
    paddingBottom: 60
  }
});
