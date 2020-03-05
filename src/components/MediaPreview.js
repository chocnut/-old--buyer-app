import React from "react";
import Modal from "react-native-modal";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
  Animated
} from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";
import FastImage from "react-native-fast-image-expo";

export default class MediaPreview extends React.Component {
  constructor(props) {
    super(props);
    this.marginPos = new Animated.Value(0);
  }

  state = {
    showDetails: true
  };

  toggleDetails = () => {
    const showDetails = !this.state.showDetails;
    const toValue = showDetails ? 0 : 150;
    Animated.timing(this.marginPos, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start();
    this.setState({ showDetails });
  };

  renderFooter = attributes => {
    const description = attributes.description || "No comment added";

    const transform = [{ translateY: this.marginPos }];
    return (
      <Animated.View
        style={[
          styles.footer,
          { transform },
          this.props.deviceIsIphoneX && styles.footerLarge
        ]}
      >
        <Text style={styles.textInput}>{description}</Text>
      </Animated.View>
    );
  };

  render() {
    const attributes =
      (this.props.media && this.props.media.attributes) || null;
    if (!attributes) return null;

    const aspectRatio = attributes.height / attributes.width;
    const imgWidth = layout.window.width;
    const imgHeight = imgWidth * aspectRatio;
    const headerTransform = [
      {
        translateY: this.marginPos.interpolate({
          inputRange: [0, 150],
          outputRange: [0, -150]
        })
      }
    ];

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor="white"
        backdropOpacity={1}
        isVisible={this.props.visible}
        animationInTiming={400}
        animationOutTiming={600}
        onBackdropPress={this.props.onClose}
        style={{ margin: 0 }}
      >
        <View style={[styles.container]}>
          <Animated.View
            style={[
              styles.header,
              this.props.deviceIsIphoneX && styles.headerLarge,
              { transform: headerTransform }
            ]}
          >
            <View id="placeholder" style={{ width: 56, height: 56 }}></View>
            <Text style={styles.headerText}>Review</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={this.props.onClose}
              activeOpacity={1}
            >
              <Image
                style={styles.closeBtn}
                source={require("../assets/images/close_dark.png")}
              />
            </TouchableOpacity>
          </Animated.View>

          <ScrollView
            maximumZoomScale={2.2}
            contentContainerStyle={[
              styles.scrollZone,
              !attributes.description && styles.padBottom
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={this.toggleDetails}>
              <FastImage
                source={{ uri: attributes.file_uri }}
                style={{ width: imgWidth, height: imgHeight }}
              />
            </TouchableOpacity>
          </ScrollView>

          {this.renderFooter(attributes)}
        </View>

        <StatusBar barStyle="dark-content" />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
    backgroundColor: "white",
    paddingTop: 25,
    paddingBottom: 10,
    flex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5000
  },
  headerLarge: {
    minHeight: 70,
    paddingTop: 40
  },
  headerText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    textAlign: "center",
    color: colors.graphite,
    flex: 1
  },
  scrollZone: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  padBottom: {
    paddingBottom: 40
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
  imageHolder: {
    flex: 1,
    paddingBottom: 80
  },
  img: {
    width: "100%",
    height: "100%"
  },
  footer: {
    minHeight: 50,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 0,
    position: "absolute",
    bottom: 0,
    left: 0
  },
  footerLarge: {
    minHeight: 50,
    paddingBottom: 40
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    color: colors.graphite,
    flex: 1,
    width: "100%"
  }
});
