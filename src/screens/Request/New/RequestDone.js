import React from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import Btn from "../../../components/Btn";

export default function RequestDone({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Request Sent!</Text>
        <Text style={styles.subHeader}>
          Your request has been received and our team will review within 1-2
          hours
        </Text>
        <Image
          style={styles.cloudImg}
          source={require("../../../../assets/images/cloud-transparent.png")}
        />
        <Image
          style={styles.circleCheck}
          source={require("../../../../assets/images/circle-check.png")}
        />
        <View style={styles.btnContainer}>
          <Btn
            onPress={() => navigation.navigate("Main")}
            title="Continue"
            width={170}
          >
            Continue
          </Btn>
        </View>
      </View>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1,
    marginTop: 104,
    alignItems: "center"
  },
  header: {
    color: "#555064",
    fontSize: 24,
    fontFamily: "Quicksand-Regular"
  },
  subHeader: {
    justifyContent: "center",
    paddingTop: 20,
    paddingRight: 63,
    paddingLeft: 70,
    color: "#555064",
    fontSize: 14,
    fontFamily: "Quicksand-Regular"
  },
  cloudImg: {
    marginTop: 136,
    width: 300,
    height: 191
  },
  circleCheck: {
    position: "absolute",
    width: 135,
    height: 135,
    left: 140,
    top: 250
  },
  btnContainer: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 37
  }
});
