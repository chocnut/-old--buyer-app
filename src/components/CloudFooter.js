import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
const redCloud = require("../../assets/images/cloud-aero-red.png");
const whiteCloud = require("../../assets/images/cloud-aero-white.png");

export default class CloudFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cloud = redCloud;

    if (this.props.color && this.props.color === "white") {
      cloud = whiteCloud;
    }

    return (
      <ImageBackground
        source={cloud}
        style={[
          styles.container,
          { width: this.props.width, height: this.props.height }
        ]}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70
  }
});
