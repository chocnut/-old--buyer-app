import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { StyleSheet, View, Keyboard, PanResponder } from "react-native";
import Swiper from "../../components/Swiper";
import LogoTitle from "../../components/LogoTitle";
import HeaderBtn from "../../components/HeaderBtn";
import RequestWizard_Title from "./RequestWizard_Title";
import RequestWizard_Media from "./RequestWizard_Media";
import RequestWizard_Details from "./RequestWizard_Details";
import RequestWizard_Review from "./RequestWizard_Review";
import MediaMenu from "../../components/MediaMenu";
import MediaWizard from "../../components/MediaWizard";
import MediaPreview from "../../components/MediaPreview";
import colors from "../../constants/Colors";
import NextArrow from "../../components/NextArrow";
import utils from "../../utils";

@observer
export default class RequestWizard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    if (state.params != undefined) {
      const title = state.params.title || getTitle(state.params.viewIndex);
      const onClose = state.params.handleClose;
      const leftButton =
        state.params.leftButton ||
        getButton(state.params.viewIndex, state.params.request_sent);
      return {
        headerTitle: (
          <LogoTitle
            text={title || "Request"}
            leftButton={leftButton}
            onClose={onClose}
          />
        )
      };
    }
  };

  state = {
    request_media: null,
    request: null,
    unedited_request: null,
    viewIndex: this.props.navigation.getParam("viewIndex") || 0,
    mediaMenuVisible: false,
    mediaWizardVisible: false,
    mediaSource: "library",
    media_to_preview: null,
    enableSwipe: true,
    showTitleError: false
  };

  constructor(props) {
    super(props);
    this.needsLargeFooter = false;
    this.changeView(this.state.viewIndex);
  }

  componentDidMount = async () => {
    this.props.navigation.setParams({ handleClose: this.handleClose });

    //this.showAlert = this.props.screenProps.showAlert;
    //this.closeAlert = this.props.screenProps.closeAlert;
    // this.handleError = this.props.screenProps.handleError;
    // this.setLoading = this.props.screenProps.setLoading;
    // this.store = this.props.screenProps.appStore;

    this.needsLargeFooter = this.store.deviceIsIphoneX;

    const request = toJS(this.store.currentRequest);
    console.log("////");
    console.log(request);
    console.log("////");
    const request_media =
      this.store.media[request.id] || toJS(this.store.currentMedia);
    await this.setState({
      request,
      request_media,
      unedited_request: JSON.stringify(request)
    });

    this.changeView(this.state.viewIndex);

    // add keyboard listeners, so we can hide the close button when the keyboard is open
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardDidHide
    );
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  changeView = newIndex => {
    const title = getTitle(newIndex);
    const request_sent = this.state.request
      ? this.state.request.attributes.sent_at
      : false;
    const btnHandler =
      newIndex === 1 ? this.toggleMediaMenu : () => this.gotoView(2);
    const leftButton = getButton(newIndex, request_sent, btnHandler);

    this.props.navigation.setParams({ title, leftButton, viewIndex: newIndex });
  };

  gotoView = viewIndex => {
    this.setState({ viewIndex });
  };

  handleClose = async () => {
    const { sent_at } = this.state.request.attributes;
    const request_state = JSON.stringify(this.state.request);
    const has_new_media = this.state.request_media.filter(m => m.id < 0).length;
    const has_changes =
      request_state !== this.state.unedited_request || has_new_media;
    Keyboard.dismiss();

    if (!sent_at && has_changes) {
      await this.showAlert({
        visible: true,
        image: require("../../assets/images/upload.png"),
        title: "Save as draft?",
        body:
          "Would you like to save this product request as a draft? You can return to it later.",
        btnText: "Save",
        secondaryText: "No thanks",
        onClose: this.close,
        onAccept: this.delaySaveRequest,
        allowClose: true
      });
    } else {
      this.close();
    }
  };

  close = async target => {
    await this.closeAlert();
    if (!target) {
      target = this.state.request.attributes.sent_at ? "sent" : "draft";
    }
    this.props.navigation.navigate("Requests", { tab: target });
  };

  updateRequest = (field, value) => {
    const old_request = JSON.parse(JSON.stringify(this.state.request));
    old_request.attributes[field] = value;
    this.setState({ request: old_request });
  };

  toggleMediaMenu = async () => {
    this.setState({ mediaMenuVisible: !this.state.mediaMenuVisible });
  };

  addMediaFromSource = async mediaSource => {
    await this.setState({
      mediaMenuVisible: false,
      mediaWizardVisible: true,
      mediaSource
    });
  };

  addMedia = media => {
    this.setState({
      request_media: [...this.state.request_media, media],
      mediaWizardVisible: false
    });
  };

  cancelAddMedia = () => {
    this.setState({
      mediaWizardVisible: false
    });
  };

  confirmDeleteMedia = async media => {
    await this.showAlert({
      visible: true,
      image: require("../../assets/images/trash.png"),
      title: "Are you sure?",
      body: "Do you really want to delete this media file?",
      btnText: "Delete",
      secondaryText: "Cancel",
      onClose: this.closeAlert,
      onAccept: () => this.deleteMedia(media),
      allowClose: false
    });
  };

  deleteMedia = async media => {
    this.closeAlert();
    const id = media.id;
    let request_media = [...toJS(this.state.request_media)];

    request_media.forEach(m => {
      if (m.id === id) {
        m.forDeletion = true;
      }
    });

    request_media = request_media.filter(m => {
      return !m.forDeletion || (m.forDeletion && m.id > 0);
    });

    this.setState({ request_media });
  };

  delaySaveRequest = async () => {
    await this.closeAlert();
    setTimeout(async () => {
      try {
        this.saveRequest();
      } catch (e) {
        console.log(e);
        this.setLoading(false);
      }
    }, 650);
  };

  saveRequest = async (sendAfter = false) => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setState({ showTitleError: false });
        const request = await JSON.parse(JSON.stringify(this.state.request));
        await utils.checkForRequiredFields(request.attributes, ["title"]);
        this.setLoading(true);

        setTimeout(async () => {
          try {
            console.log("saving request");
            const id = await this.store.saveRequest(request);
            console.log("request saved with id: " + id);
            request.id = id;
            console.log(
              "saving media items x " + this.state.request_media.length
            );
            await this.saveRequestMedia(id);
            console.log("media saved");
            await this.setState({ request });

            await this.store.getRequests();
            await this.store.getMediaLink(id);

            this.setLoading(false);

            if (!sendAfter) {
              await this.showAlert({
                visible: true,
                image: require("../../assets/images/check.png"),
                title: "Congratulations!",
                body: "Your request has been saved as a draft.",
                btnText: "OK",
                onClose: this.closeAlert,
                onAccept: this.close,
                allowClose: false
              });
            }

            resolve();
          } catch (e) {
            this.handleError(e);
            this.setLoading(false);
            reject(e);
          }
        }, 1);
      } catch (e) {
        this.gotoView(0);
        this.setState({ showTitleError: true });
        this.setLoading(false);

        if (sendAfter) {
          reject(e);
        }
      }
    });
  };

  saveRequestMedia = request_id => {
    return new Promise(async (resolve, reject) => {
      try {
        const media = this.state.request_media;

        if (media.length) {
          const model = ["request_id", "file", "description"];
          await utils.asyncForEach(media, async item => {
            const m = item.attributes;
            m.request_id = request_id;

            // strip out any data the API doesn't care about
            Object.keys(m).forEach(key => {
              if (!model.includes(key)) {
                delete m[key];
              }
            });

            // only save the file if it is a new image
            if (item.id < 0) {
              console.log("saving media item");
              await this.store.createMedia(m);
            }

            if (item.forDeletion) {
              console.log("deleting media item");
              await this.store.deleteMedia(item);
            }
          });
        }

        resolve();
      } catch (e) {
        console.log(e);
        this.handleError();
        this.setLoading(false);
        reject(e);
      }
    });
  };

  sendRequest = async () => {
    try {
      await utils.checkForRequiredFields(this.state.request.attributes, [
        "title"
      ]);
      await this.saveRequest(true);
      await this.store.sendRequest(this.state.request);
      await this.store.getRequests();

      await this.showAlert({
        visible: true,
        image: require("../../assets/images/check.png"),
        title: "Congratulations!",
        body:
          "Your request has been sent. Please allow 2-3 days for your agent to prepare your quote.",
        btnText: "Done",
        onClose: this.closeAlert,
        onAccept: () => this.close("sent"),
        allowClose: false
      });
    } catch (e) {
      console.log(e);

      if (err && err.includes("Missing field")) {
        console.log("Show required fields");
        this.gotoView(0);
        this.setState({ showTitleError: true });
      } else {
        this.handleError();
      }

      this.setLoading(false);
    }
  };

  _keyboardDidShow = () => {
    // hide the close button when the keyboard shows
    this.props.navigation.setParams({ handleClose: null });
  };

  _keyboardDidHide = () => {
    // show the close button when the keyboard shows
    this.props.navigation.setParams({ handleClose: this.handleClose });
  };

  _enableSwipe = enableSwipe => {
    this.setState({ enableSwipe });
  };

  renderMediaMenu = () => {
    if (!this.state.mediaMenuVisible) return null;

    return (
      <MediaMenu
        visible={this.state.mediaMenuVisible}
        onClose={this.toggleMediaMenu}
        addMediaFromLibrary={() => this.addMediaFromSource("library")}
        addMediaFromCamera={() => this.addMediaFromSource("camera")}
        deviceIsIphoneX={this.needsLargeFooter}
      />
    );
  };

  render() {
    const request = this.state.request ? this.state.request.attributes : {};

    return (
      <View style={styles.container}>
        <Swiper
          index={this.state.viewIndex}
          onIndexChanged={this.changeView}
          controlsWrapperStyle={[
            styles.carouselControls,
            this.needsLargeFooter && styles.carouselControlsLarge
          ]}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          dotsWrapperStyle={styles.dotsWrapperStyle}
          prevButtonStyle={styles.prevButtonStyle}
          prevButtonText="PREV"
          nextButtonElement={<NextArrow />}
          enableSwipe={false}
          gotoView={this.gotoView}
        >
          <RequestWizard_Title
            style={styles.slideContainer}
            request={request}
            onChange={this.updateRequest}
            showTitleError={this.state.showTitleError}
          />

          <RequestWizard_Media
            style={styles.slideContainer}
            images={this.state.request_media}
            mediaMenuVisible={this.state.mediaMenuVisible}
            onDeleteMedia={this.confirmDeleteMedia}
            onClickMedia={media => this.setState({ media_to_preview: media })}
          />

          <RequestWizard_Details
            style={styles.slideContainer}
            request={request}
            onChange={this.updateRequest}
            setSwipable={this.setSwipable}
            _enableSwipe={this._enableSwipe}
            _keyboardDidShow={this._keyboardDidShow}
            _keyboardDidHide={this._keyboardDidHide}
          />

          <RequestWizard_Review
            style={styles.slideContainer}
            request={request}
            request_media={this.state.request_media}
            onSave={this.saveRequest}
            onSend={this.sendRequest}
            changeView={this.gotoView}
            deviceIsIphoneX={this.needsLargeFooter}
          />
        </Swiper>

        {this.renderMediaMenu()}

        <MediaWizard
          visible={this.state.mediaWizardVisible}
          onSave={this.addMedia}
          source={this.state.mediaSource}
          onCancel={this.cancelAddMedia}
          deviceIsIphoneX={this.needsLargeFooter}
          showAlert={this.showAlert}
          closeAlert={this.closeAlert}
        />

        <MediaPreview
          visible={!!this.state.media_to_preview}
          media={this.state.media_to_preview}
          onClose={() => this.setState({ media_to_preview: null })}
          deviceIsIphoneX={this.needsLargeFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  carouselControls: {
    backgroundColor: "#FBFBFB",
    paddingHorizontal: 30,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 60,
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  carouselControlsLarge: {
    paddingBottom: 20,
    minHeight: 70
  },
  dotsWrapperStyle: {
    width: 46
  },
  dotStyle: {
    backgroundColor: "rgba(85, 80, 100, 0.49)",
    width: 8,
    height: 8,
    margin: 10
  },
  activeDotStyle: {
    backgroundColor: colors.red
  },
  prevButtonStyle: {
    fontFamily: "QuicksandBold",
    color: "#555064",
    fontSize: 14,
    opacity: 1,
    paddingVertical: 25
  },
  next: {
    position: "absolute",
    bottom: -30,
    right: 15,
    zIndex: 20
  }
});

const getTitle = index => {
  switch (index) {
    case 0:
      return "Request";
    case 1:
      return "Media";
    case 2:
      return "Details";
    case 3:
      return "Summary";
  }
};

const getButton = (index, request_sent, btnHandler) => {
  btnHandler =
    btnHandler ||
    function() {
      console.log("placeholder function");
    };

  if (index === 1) {
    return (
      <HeaderBtn
        title="Media"
        onPress={btnHandler}
        image={require("../../assets/images/camera.png")}
      />
    );
  }

  if (index === 3 && !request_sent) {
    return (
      <HeaderBtn
        title="Edit"
        onPress={btnHandler}
        image={require("../../assets/images/edit_pencil.png")}
      />
    );
  }

  return null;
};
