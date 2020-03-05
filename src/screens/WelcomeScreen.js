import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import CloudFooter from "../components/CloudFooter";
import Btn from "../components/Btn";
import Layout from "../constants/Layout";
const logo = require("../../assets/images/splash.png");

const WelcomeScreen = () => {
  const imgWidth = Layout.window.width;
  const imgHeight = Math.round(imgWidth * (833 / 1500));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <CloudFooter color="white" width={imgWidth} height={imgHeight}>
        <Btn onPress={null} title="Create account" width={190}>
          Sign up
        </Btn>
        <TouchableOpacity onPress={null} activeOpacity={0.8}>
          <Text style={styles.textLink}>
            Already have an account? <Text style={styles.hlink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </CloudFooter>
      <StatusBar barStyle="light-content" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F03758",
    position: "relative"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textLink: {
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    color: "#555064",
    padding: 8
  },
  hlink: {
    textDecorationLine: "underline"
  },
  logo: {
    width: 400
  }
});
export default WelcomeScreen;
