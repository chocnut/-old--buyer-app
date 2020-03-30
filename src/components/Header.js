import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image
} from "react-native";
import colors from "../constants/Colors";
import variables from "../constants/Variables";

const userIcon = require("../../assets/images/user-icon.png");
const logo = require("../../assets/images/logo-white.png");
const messageIcon = require("../../assets/images/comment-lines-icon.png");
const messageNotifyIcon = require("../../assets/images/comment-lines-notify-icon.png");

export default class Header extends React.Component {
  render() {
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.secondary}
        />
        <View style={styles.statusBar} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.props.onPressProfile}
            title="Profile"
            activeOpacity={0.8}
            style={[styles.btn, styles.btnProfile]}>
              <Image style={styles.btnIcon} source={userIcon} />
          </TouchableOpacity>

          <Image style={styles.logo} source={logo} />

          <TouchableOpacity
            onPress={this.props.onPressMessages}
            title="Messages"
            activeOpacity={0.8}
            style={[styles.btn, styles.btnMessages]}>
              <Image style={styles.btnIcon} source={this.props.notify ? messageNotifyIcon : messageIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: colors.secondary,
    height: variables.statusBarHeight
  },
  header: {
    height: variables.headerHeight,
    backgroundColor: colors.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 87,
    height: 32,
  },
  btn: {
    position: "absolute",
    top: 8,
    width: 50,
    height: 50,
    padding: 11,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  btnIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain"
  },
  btnProfile: {
    left: 8
  },
  btnMessages: {
    right: 8
  }
});
