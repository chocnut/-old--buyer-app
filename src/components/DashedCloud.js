import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

function DashedCloud(props) {
  return (
    <View style={[styles.container, props.style]}>
      <ImageBackground
        source={require("../../assets/images/dashed-cloud.png")}
        style={styles.cloud}
      >
        {props.children}
      </ImageBackground>
    </View>
  );
}

export default DashedCloud;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  cloud: {
    marginTop: 18,
    width: 300,
    height: 191,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});
