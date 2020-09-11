import React, { useState, useEffect } from "react";
import { Linking } from "expo";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView
} from "react-native";
import colors from "../../constants/Colors";
import Constants from "expo-constants";
import Btn from "../../components/Btn";
import DashedCloud from "../../components/DashedCloud";
import Layout from "../../constants/Layout";

const titleTop = () => {
  return Layout.window.height >= 667
    ? (Layout.window.height / 100) * 8
    : (Layout.window.height / 100) * 6;
};

const InfoScreen = ({ navigation, route }) => {
  const [verified, setVerified] = useState("");
  const { params } = route;

  const _handleUrl = url => {
    alert("URL", JSON.stringify(url));

    let { path, queryParams } = Linking.parse(url);

    alert(
      `Linked to app with path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    );

    if (Object.keys(queryParams).length > 0) {
      setVerified(queryParams.verified);
    } else if (
      typeof url === "object" &&
      url.url &&
      url.url.includes("?verified=true")
    ) {
      setVerified(true);
    }
  };

  const getInitialUrl = async () => {
    const url = await Linking.getInitialURL();
    _handleUrl(url);
  };

  useEffect(() => {
    Linking.addEventListener("url", _handleUrl);
    getInitialUrl();
  }, []);

  useEffect(() => {
    if (verified) {
      console.log("verified");
      navigation.navigate("AccountActivation", {
        verified
      });
    }
  }, [verified]);

  const bodyText = () => {
    const emailRegex = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

    if (!params.body) {
      return false;
    }

    const words = params.body.split(emailRegex);

    const contents = words.map(function(word, i) {
      if (word.match(emailRegex)) {
        return (
          <Text key={i} style={[styles.text, styles.email]}>
            {word}
          </Text>
        );
      }
      return (
        <Text key={i} style={[styles.text]}>
          {word}
        </Text>
      );
    });

    return contents;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>{params.title}</Text>

      {bodyText()}

      <DashedCloud style={styles.cloud}>
        {params.icon && <Image style={styles.icon} source={params.icon} />}
      </DashedCloud>

      <SafeAreaView style={styles.footer}>
        {params.btn && params.btn.onPress && (
          <Btn
            onPress={params.btn.onPress}
            title={params.btn.title}
            primary
            width={190}
          >
            {params.btn.title}
          </Btn>
        )}
        {params.btnLink && params.btnLink.onPress && (
          <Text style={styles.btnLink} onPress={params.btnLink.onPress}>
            {params.btnLink.title}
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight
  },
  title: {
    marginTop: titleTop(),
    color: colors.secondary,
    fontFamily: "Quicksand-Medium",
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontFamily: "Quicksand-Medium",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
    color: colors.secondary,
    marginBottom: 8
  },
  email: {
    fontFamily: "Quicksand-Bold",
    marginBottom: 20,
    color: colors.primary
  },
  cloud: {
    ...StyleSheet.absoluteFill
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  footer: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto"
  },
  btnLink: {
    padding: 12,
    color: colors.primary,
    textDecorationLine: "underline"
  }
});

export default InfoScreen;
