import React from "react";
import { View, Image, ImageBackground, StyleSheet, Text } from "react-native";
import colors from "../constants/Colors";

export default class EmptyState extends React.Component {
  renderBGImage = () => {
    if (this.props.backgroundImage) {
      return (
        <ImageBackground
          source={require("../assets/images/up_arrow.png")}
          style={styles.bgImage}
        />
      );
    }

    return null;
  };

  render() {
    return (
      <View style={styles.emptyState}>
        {this.renderBGImage()}
        <Image
          source={this.props.image}
          style={[styles.emptyImage, this.props.imageStyle]}
        />
        <Text style={styles.emptyHeading}>{this.props.heading}</Text>
        <Text style={styles.emptyText}>{this.props.body}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 150
  },
  emptyImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 35
  },
  bgImage: {
    width: 120,
    height: 168,
    resizeMode: "contain",
    margin: 0,
    alignSelf: "flex-start",
    position: "absolute",
    top: -10,
    left: 15,
    zIndex: -1
  },
  emptyHeading: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
    color: colors.graphite,
    maxWidth: 300,
    marginBottom: 11
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Quicksand-Regular",
    color: colors.graphite,
    maxWidth: 300,
    lineHeight: 20
  }
});
