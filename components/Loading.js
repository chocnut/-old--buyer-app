import React from "react";
import Modal from "react-native-modal";
import { StyleSheet, Animated, Easing } from "react-native";
import colors from "../constants/Colors";

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.rotation = new Animated.Value(0);
    this.opacity = new Animated.Value(0);
    this.rotating = false;
  }

  rotate = async () => {
    this.rotating = true;
    this.rotation.stopAnimation();
    await this.rotation.setValue(0);
    Animated.timing(this.rotation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(async () => {
      if (this.props.isVisible) {
        this.rotate();
      } else {
        this.rotating = false;
        this.rotation.stopAnimation();
        await this.rotation.setValue(0);
      }
    });
  };

  componentWillReceiveProps = async props => {
    if (props.isVisible && !this.props.isVisible) {
      this.rotate();

      await this.opacity.setValue(0);
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      });
    }
  };

  render() {
    if (!this.props.isVisible) return null;

    const RotateData = this.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-360deg"]
    });
    const transform = [{ rotate: RotateData }];

    return (
      <Modal
        animationIn="zoomIn"
        backdropColor={colors.graphite}
        isVisible={this.props.isVisible}
        animationInTiming={400}
        animationOutTiming={600}
        style={[styles.modal, { opacity: this.opacity }]}
      >
        <Animated.Image
          source={require("../assets/images/loader.png")}
          style={[styles.image, { transform }]}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 165,
    height: 165,
    resizeMode: "contain"
  }
});
