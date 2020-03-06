import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Layout from "../constants/Layout";
import FastImage from "react-native-fast-image-expo";

export default class MediaThumbnail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.img}
          source={{ uri: this.props.image }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }
}

let size = 90;
if (Layout.window.width > 400) {
  size = 75;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 1,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#eee"
  },
  img: {
    borderRadius: 4,
    width: size,
    height: size
  }
});
