import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default class LogoTitle extends React.Component {
  renderLeftButton = () => {
    return this.props.leftButton || null;
  };

  renderRightButton = () => {
    return this.props.rightButton || null;
  };

  renderTitle = () => {
    if (!this.props.text) return null;
    return (
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 18,
          fontFamily: "Quicksand-Bold",
          marginTop: 20
        }}
      >
        {this.props.text}
      </Text>
    );
  };

  renderLogo = () => {
    if (this.props.text) return null;
    return (
      <Image
        source={require("../assets/images/logo-white.png")}
        style={{
          width: 92,
          height: 34,
          marginTop: 14,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />
    );
  };

  renderCloseBtn = () => {
    if (!this.props.onClose) return null;
    return (
      <TouchableOpacity
        style={{ position: "absolute", right: 8, top: 8, padding: 15 }}
        activeOpacity={1}
        onPress={() => this.props.onClose()}
      >
        <Image
          style={{ width: 16, height: 16 }}
          source={require("../assets/images/close.png")}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        {this.renderLeftButton()}
        {this.renderTitle()}
        {this.renderLogo()}
        {this.renderCloseBtn()}
        {this.renderRightButton()}
      </View>
    );
  }
}
