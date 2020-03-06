import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing
} from "react-native";
import Modal from "react-native-modal";
import layout from "../constants/Layout";
import colors from "../constants/Colors";
import MasterAddBtnSmall from "./MasterAddBtnSmall";
import { LinearGradient } from "expo";

export default class MasterAddBtn extends React.Component {
  constructor(props) {
    super(props);
    this.btnRotation = new Animated.Value(0);
    this.btnPosition1 = new Animated.Value(0);
    this.btnPosition2 = new Animated.Value(0);
    this.btnPosition3 = new Animated.Value(0);
    this.btnOpacity = new Animated.Value(0);
  }

  componentWillReceiveProps = newProps => {
    const active = newProps.visible;

    if (active) {
      this.animateButton(true);
    }
  };

  animateButton = active => {
    const duration = active ? 450 : 250;
    const useNativeDriver = true;
    let easing;
    if (active) {
      easing = Easing.elastic(0.8);
    }

    const buttonHeight = 44;
    const buttonMargin = 15;
    const clearance = -(buttonHeight + buttonMargin);

    Animated.parallel([
      Animated.timing(this.btnRotation, {
        toValue: active ? 45 : 0,
        duration: duration * 0.75,
        useNativeDriver,
        easing
      }),
      Animated.timing(this.btnOpacity, {
        toValue: active ? 1 : 0,
        duration,
        useNativeDriver,
        easing
      }),
      Animated.timing(this.btnPosition1, {
        toValue: active ? 3 * clearance - 10 : 0,
        duration,
        useNativeDriver,
        easing
      }),
      Animated.timing(this.btnPosition2, {
        toValue: active ? 2 * clearance - 10 : 0,
        duration,
        useNativeDriver,
        easing
      }),
      Animated.timing(this.btnPosition3, {
        toValue: active ? 1 * clearance - 10 : 0,
        duration,
        useNativeDriver,
        easing
      })
    ]).start();
  };

  close = () => {
    this.animateButton(false);
    setTimeout(() => {
      this.props.onClose();
    }, 150);
  };

  closeImmediately = () => {
    this.btnRotation = new Animated.Value(0);
    this.btnPosition1 = new Animated.Value(0);
    this.btnPosition2 = new Animated.Value(0);
    this.btnPosition3 = new Animated.Value(0);
    this.btnOpacity = new Animated.Value(0);
    this.props.onClose();
  };

  handleClick = target => {
    this.closeImmediately();
    this.props.action(target);
  };

  render() {
    const active = this.props.visible;
    const transform = [
      {
        rotate: this.btnRotation.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"]
        })
      }
    ];

    return (
      <Animated.View>
        <Modal
          style={styles.container}
          transparent
          isVisible={this.props.visible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropColor={colors.graphite}
          backdropColorOpacity={0}
          animationInTiming={1}
          animationOutTiming={250}
          onBackdropPress={this.close}
        >
          <LinearGradient
            colors={["transparent", colors.graphiteHardlyOpacity]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
            pointerEvents="none"
          />

          <Animated.View
            style={[
              styles.btnContainer,
              {
                opacity: this.btnOpacity,
                transform: [{ translateY: this.btnPosition1 }]
              }
            ]}
          >
            <MasterAddBtnSmall
              title="New request"
              image={require("../assets/images/add-request.png")}
              onPress={() => this.handleClick()}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.btnContainer,
              {
                opacity: this.btnOpacity,
                transform: [{ translateY: this.btnPosition2 }]
              }
            ]}
          >
            <MasterAddBtnSmall
              title="Take photo"
              image={require("../assets/images/add-camera.png")}
              onPress={() => this.handleClick("camera")}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.btnContainer,
              {
                opacity: this.btnOpacity,
                transform: [{ translateY: this.btnPosition3 }]
              }
            ]}
          >
            <MasterAddBtnSmall
              title="Camera roll"
              image={require("../assets/images/add-image.png")}
              onPress={() => this.handleClick("library")}
            />
          </Animated.View>

          <Animated.View style={[styles.btnContainer, { transform }]}>
            <TouchableOpacity
              style={[styles.addBtn]}
              activeOpacity={1}
              onPress={this.close}
            >
              <Image
                source={require("../assets/images/add.png")}
                style={styles.plus}
              />
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    flex: 1
  },
  btnContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 2,
    width: 56,
    height: 56
  },
  smallBtnContainer: {
    zIndex: 1
  },
  addBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 28,
    backgroundColor: colors.red,
    zIndex: 100
  },
  plus: {
    width: 22,
    height: 22
  },
  smallBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  background: {
    position: "absolute",
    top: 0,
    width: layout.window.width,
    height: layout.window.height,
    backgroundColor: colors.graphite
  }
});
