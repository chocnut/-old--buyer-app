import React from "react";
import Tab from "./Tab";
import { StyleSheet, View, Animated, Easing } from "react-native";
import colors from "../constants/Colors";

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.highlightPosition = new Animated.Value(25);
  }

  animate = async target => {
    try {
      await Animated.timing(this.highlightPosition, {
        toValue: target,
        duration: 300,
        easing: Easing.easeInOut
      }).start();
    } catch (err) {
      console.log(err);
    }
  };

  getPosition = () => {
    return this.highlightPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "1%"]
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.mode === "draft") {
      this.animate(25);
    } else {
      this.animate(75);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Tab
          onPress={() => this.props.changeMode("draft")}
          selected={this.props.mode === "draft"}
        >
          Draft
        </Tab>
        <Tab
          onPress={() => this.props.changeMode("sent")}
          selected={this.props.mode === "sent"}
        >
          Sent
        </Tab>
        <Animated.View
          style={[styles.border, { left: this.getPosition() }]}
        ></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    position: "relative",
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomWidth: 0
  },
  border: {
    width: 40,
    height: 3,
    backgroundColor: colors.borderAccent,
    position: "absolute",
    bottom: 0,
    marginLeft: -20
  }
});
