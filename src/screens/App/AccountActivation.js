import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import Btn from "../../components/Btn";

const AccountActivation = ({ navigation, route }) => {
  const {
    params: { verified }
  } = route;

  if (verified === false) {
    navigation.navigate("Welcome");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.cloudImg}
          source={require("../../../assets/images/logo-gray.png")}
        />
        <Text style={styles.header}>Congrats, you're in!</Text>
        <Text style={styles.subHeader}>
          You successfully <Text style={styles.activated}>activated</Text> your
          eeewo account!
        </Text>
        <Text style={styles.subHeader2}>
          You're ready to start sourcing product! Hundres of our suppliers are
          waiting to send you the best offers... So jum right in and eewoo it!
        </Text>
        <View style={styles.btnContainer}>
          <Btn
            onPress={() =>
              navigation.navigate("Login", {
                accountActivated: true
              })
            }
            title="Continue"
            width={170}
          >
            Login
          </Btn>
        </View>
      </View>
      <StatusBar barStyle="dark-content" />
    </View>
  );
};

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
    width: 200,
    textAlign: "center",
    marginTop: 85,
    color: "#F03758",
    fontSize: 36,
    fontFamily: "Quicksand-Bold"
  },
  subHeader: {
    marginTop: 72,
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 16,
    color: "#555064",
    fontSize: 14,
    fontFamily: "Quicksand-Regular"
  },
  activated: {
    color: "#555064",
    fontSize: 14,
    fontFamily: "Quicksand-Bold"
  },
  subHeader2: {
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 34,
    color: "#555064",
    fontSize: 14,
    fontFamily: "Quicksand-Regular"
  },
  cloudImg: {
    width: 147,
    height: 54
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
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default AccountActivation;
