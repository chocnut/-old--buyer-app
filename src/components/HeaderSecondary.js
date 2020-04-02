import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import HeaderBtn from "./HeaderBtn";
import colors from "../constants/Colors";
import variables from "../constants/Variables";
import HeaderBackground from "./HeaderBackground";

export default class HeaderSecondary extends React.Component {
  render() {
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.secondary}
        />
        <View style={styles.statusBar} />
        <View style={styles.header}>
          {this.props.onPress && (
            <HeaderBtn
              onPress={this.props.onPress}
              title="Back"
              image={require("../../assets/images/arrow-left-icon.png")}
              style={styles.btnBack}
            />
          )}
          <Text style={styles.headerTitle}>{this.props.title}</Text>
          <HeaderBackground />
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
  headerTitle: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "white"
  },
  btnBack: {
    position: "absolute",
    top: 8,
    left: 8
  }
});
