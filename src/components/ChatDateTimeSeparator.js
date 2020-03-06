import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

const ChatDateTimeSeparator = props => {
  return (
    <View style={[styles.container, props.lastInGroup ? { marginTop: 8 } : {}]}>
      <View style={styles.separatorLine}></View>
      <Text style={styles.date}>{props.title}</Text>
      <View style={styles.separatorLine}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 12
  },
  separatorLine: {
    height: 1,
    flexGrow: 1,
    backgroundColor: "#F2F2F2"
  },
  date: {
    paddingHorizontal: 12,
    fontFamily: "Quicksand-Bold",
    fontSize: 12,
    textAlign: "center",
    color: "#A9A9A9"
  }
});

export default ChatDateTimeSeparator;
