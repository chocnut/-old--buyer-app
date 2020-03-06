import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

export default class HeaderBtn extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.btn, this.props.style]}
        onPress={this.props.onPress}
        title={this.props.title}
        activeOpacity={1}
      >
        <Image style={styles.image} source={this.props.image} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 50,
    height: 50,
    padding: 11,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 20,
    left: 10,
    top: 6
  },
  image: {
    width: 28,
    maxHeight: 18,
    resizeMode: "contain"
  }
});
