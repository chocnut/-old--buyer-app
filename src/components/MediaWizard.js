import React from "react";
import Modal from "react-native-modal";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  StatusBar,
  ImageEditor,
  ImageStore,
  Animated,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import {
  ImagePicker,
  Permissions,
  Linking,
  FileSystem,
  MediaLibrary,
  ImageManipulator
} from "expo";
import colors from "../constants/Colors";
import Sketch from "./Sketch";
import { HueSlider } from "react-native-color";
import tinycolor from "tinycolor2";
import api from "../api";

export default class MediaWizard extends React.Component {
  constructor(props) {
    super(props);
    this.toolbarY = new Animated.Value(0);
  }

  state = {
    media: null,
    annotated_media: null,
    description: "",
    visible: false,
    hasBeenAnnotated: false,
    resetAnnotationTrigger: 0,
    showToolbar: false,
    color: tinycolor(colors.red).toHsl(),
    layers: 0
  };

  updateHue = h => {
    this.setState({
      color: { ...this.state.color, h, s: 0.85, l: 0.6 }
    });
  };

  setDescription = description => {
    this.setState({ description });
  };

  componentWillReceiveProps = newProps => {
    if (newProps.visible && !this.props.visible) {
      this.addMedia(newProps.source);
    } else if (!newProps.visible && this.props.visible) {
      this.setState({
        media: null,
        annotated_media: null,
        description: "",
        visible: false,
        hasBeenAnnotated: false,
        resetAnnotationTrigger: 0
      });
    }
  };

  onSave = async () => {
    const media = this.state.annotated_media;
    media.attributes.description = this.state.description;
    await this.setState({ visible: false });

    setTimeout(() => {
      this.props.onSave(media);
    }, 750);
  };

  addMedia = async type => {
    // using setTimeout to make this happen on another CPU cycle, allowing re-render (removing menu)
    setTimeout(async () => {
      const cam_permissions = await Permissions.askAsync(Permissions.CAMERA);
      const roll_permissions = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );

      const has_permission =
        (type === "camera" && cam_permissions.status === "granted") ||
        (type === "library" && roll_permissions.status === "granted");

      if (has_permission) {
        try {
          let result;
          const options = {
            base64: true,
            exif: false,
            mediaTypes: "Images"
          };

          if (type === "library") {
            result = await ImagePicker.launchImageLibraryAsync(options);
          } else {
            result = await ImagePicker.launchCameraAsync(options);
            MediaLibrary.createAssetAsync(result.uri);
          }

          if (result.cancelled) {
            this.props.onCancel();
            this.setState({ visible: false });
            return;
          }

          const resizedImage = await this.resizeImage(result);

          setTimeout(() => {
            this.setState({ visible: true });
          }, 200);

          const media = {
            id: -1 * Date.now(),
            attributes: {
              file: resizedImage.base64,
              file_uri: resizedImage.uri,
              description: "",
              width: resizedImage.width,
              height: resizedImage.height
            }
          };

          await this.toolbarY.setValue(0);
          this.setState({ media, visible: true, showToolbar: false });
        } catch (e) {
          api.postToSlack(JSON.stringify(e), "Error");
        }
      } else {
        Alert.alert(
          "Permissions needed",
          "Please update your settings to allow Eewoo to access your Camera/Photo Library",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => Linking.openURL("app-settings:") }
          ],
          { cancelable: false, onDismiss: this.props.onCancel }
        );
      }
    }, 220);
  };

  setAnnotatedMedia = async (f, hasBeenAnnotated, layers, width, height) => {
    if (!f.includes("file://")) {
      f = "file://" + f;
    }

    const file = await FileSystem.readAsStringAsync(f, {
      encoding: FileSystem.EncodingTypes.Base64
    });
    const annotated_media = {
      id: -1 * Date.now(),
      attributes: {
        file,
        file_uri: f,
        description: "",
        width,
        height
      }
    };

    this.setState({ annotated_media, hasBeenAnnotated, layers });
  };

  toggleToolbar = () => {
    const showToolbar = !this.state.showToolbar;
    const duration = 250;
    const toValue = showToolbar ? this.headerHeight : 0;
    Animated.timing(this.toolbarY, {
      toValue,
      duration,
      useNativeDriver: true
    }).start();
    this.setState({ showToolbar });
  };

  onUndoSketch = () => {
    const resetAnnotationTrigger = this.state.resetAnnotationTrigger + 1;
    this.setState({ resetAnnotationTrigger });
  };

  resizeImage = result => {
    return new Promise(async (resolve, reject) => {
      try {
        const aspect_ratio = result.height / result.width;
        const maxSize = 1200;
        let width = maxSize;
        let height = maxSize * aspect_ratio;

        if (aspect_ratio > 1) {
          // portrait
          height = maxSize;
          width = maxSize / aspect_ratio;
        }

        const resizedImage = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ resize: { width, height } }],
          { compress: 0.7, base64: true }
        );
        resolve(resizedImage);
      } catch (e) {
        api.postToSlack(JSON.stringify(e), "Error");
        reject(e);
      }
    });
  };

  tapSliderHandler = evt => {
    this.refs.slider.measure((fx, fy, width, height, px, py) => {
      console.log((evt.nativeEvent.locationX - px) / width);
    });
  };

  renderSketch(media) {
    if (!media) return null;
    const color = tinycolor(this.state.color).toHex();
    return (
      <Sketch
        image={{ uri: media.file_uri }}
        setAnnotatedMedia={this.setAnnotatedMedia}
        resetTrigger={this.state.resetAnnotationTrigger}
        width={media.width}
        height={media.height}
        color={color}
      />
    );
  }

  renderToolbar() {
    const opacity = this.state.layers > 1 ? 1 : 0.3;

    return (
      <Animated.View
        style={[styles.toolbar, { transform: [{ translateY: this.toolbarY }] }]}
        ref="slider"
      >
        <TouchableWithoutFeedback onPress={this.tapSliderHandler}>
          <HueSlider
            style={styles.sliderRow}
            gradientSteps={100}
            value={this.state.color.h}
            onValueChange={this.updateHue}
            returnMode={"hex"}
          />
        </TouchableWithoutFeedback>

        <TouchableOpacity
          style={styles.undoBtn}
          onPress={this.onUndoSketch}
          activeOpacity={0.5}
        >
          <Image
            style={[styles.undoBtnImg, { opacity }]}
            source={require("../assets/images/undo.png")}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderFooter() {
    return (
      <View
        style={[
          styles.footer,
          this.props.deviceIsIphoneX && styles.footerLarge
        ]}
      >
        <TextInput
          style={styles.textInput}
          value={this.state.description}
          onChangeText={this.setDescription}
          placeholder="Add comment"
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={this.onSave}
          activeOpacity={1}
        >
          <Text style={styles.btnText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderKeyboardAvoidingView = () => {
    if (Platform.OS === "ios") {
      return (
        <KeyboardAvoidingView behavior="position">
          {this.renderFooter()}
        </KeyboardAvoidingView>
      );
    } else {
      return this.renderFooter();
    }
  };

  renderModalContent() {
    if (!this.state.visible)
      return (
        <View>
          <ActivityIndicator size="large" color={colors.graphite} />
        </View>
      );

    const media = this.state.media && this.state.media.attributes;
    const editImage = this.state.showToolbar
      ? require("../assets/images/sketch-red.png")
      : require("../assets/images/sketch.png");

    return (
      <View style={[styles.container, !this.state.visible && { opacity: 0 }]}>
        <View
          style={[
            styles.header,
            this.props.deviceIsIphoneX && styles.headerLarge
          ]}
          onLayout={event =>
            (this.headerHeight = event.nativeEvent.layout.height)
          }
        >
          <TouchableOpacity
            style={styles.sketchBtn}
            onPress={this.toggleToolbar}
            activeOpacity={1}
          >
            <Image style={styles.sketchImg} source={editImage} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Edit</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={this.props.onCancel}
            activeOpacity={1}
          >
            <Image
              style={styles.closeBtn}
              source={require("../assets/images/close_dark.png")}
            />
          </TouchableOpacity>
        </View>

        {this.renderToolbar()}

        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
          style={styles.imageHolder}
        >
          {this.renderSketch(media)}
        </TouchableOpacity>

        {this.renderKeyboardAvoidingView()}
      </View>
    );
  }

  render() {
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor={"#FBFBFB"}
        backdropOpacity={1}
        isVisible={this.props.visible}
        animationInTiming={400}
        animationOutTiming={600}
        onBackdropPress={this.props.onClose}
        style={{ margin: 0 }}
      >
        {this.renderModalContent()}
        <StatusBar barStyle="dark-content" />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    margin: 0,
    padding: 0
  },
  header: {
    minHeight: 50,
    width: "100%",
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "white",
    paddingTop: 25,
    paddingBottom: 10,
    marginTop: 0,
    zIndex: 100
  },
  headerLarge: {
    minHeight: 70,
    paddingTop: 40
  },
  headerText: {
    fontFamily: "QuicksandBold",
    fontSize: 18,
    textAlign: "center",
    color: colors.graphite,
    flex: 1
  },
  btn: {
    padding: 20,
    width: 56,
    height: 56
  },
  closeBtn: {
    width: 16,
    height: 16
  },
  toolbar: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fafafa",
    left: 0,
    top: 0,
    zIndex: 99,
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  imageHolder: {
    flex: 1,
    paddingBottom: 80,
    marginTop: 0
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  footer: {
    backgroundColor: "#FBFBFB",
    minHeight: 50,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  footerLarge: {
    minHeight: 70,
    paddingBottom: 30
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 4,
    fontSize: 13,
    fontFamily: "QuicksandRegular",
    color: colors.graphite,
    paddingLeft: 13,
    paddingRight: 60,
    backgroundColor: "white",
    height: 50,
    flex: 1,
    width: "100%"
  },
  saveBtn: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: colors.red,
    width: 50,
    height: 50,
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  sketchBtn: {
    width: 56,
    height: 56,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginLeft: 5
  },
  sketchImg: {
    width: 26,
    height: 26,
    resizeMode: "contain"
  },
  undoBtn: {
    width: 56,
    height: 56,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 19,
    marginLeft: 18,
    marginRight: -19
  },
  undoBtnImg: {
    width: 18,
    height: 18,
    resizeMode: "contain"
  },
  btnText: {
    color: "white",
    fontFamily: "QuicksandBold",
    fontSize: 14,
    textAlign: "center"
  },
  sliderRow: {
    flex: 1
  }
});
