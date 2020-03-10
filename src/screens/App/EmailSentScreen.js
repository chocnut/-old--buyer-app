import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import colors from "../../constants/Colors";
import Constants from "expo-constants";
import Btn from "../../components/Btn";
import DashedCloud from "../../components/DashedCloud";
import Layout from "../../constants/Layout";


export default class EmailSentScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />

        <Text style={styles.title}>Check your email!</Text>
        <Text style={styles.text}>We’ve sent an email to:</Text>
        <Text style={[styles.text, styles.email]}>eewoobuyer@gmail.com</Text>
        <Text style={styles.text}>
          You should have received a magic link... {"\n"}
          Just click on it to verify your email and register your account
        </Text>

        <DashedCloud style={styles.cloud}>
          <Image style={styles.icon} source={require('../../../assets/images/subscribe.png')} />
        </DashedCloud>

        <SafeAreaView style={styles.footer}>
          <Btn onPress={()=>{}} title="OPEN EMAIL APP" primary width={190}>OPEN EMAIL APP</Btn>
          <Text style={styles.btnLink}>I didn’t receive my email</Text>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 35,
    paddingTop: Constants.statusBarHeight
  },
  title: {
    marginTop: Layout.isSmallDevice ? '10%' : '18%',
    color: colors.secondary,
    fontFamily: "Quicksand-Medium",
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    color: colors.secondary,
    marginBottom: 8
  },
  email: {
    fontFamily: "Quicksand-Bold",
    marginBottom: 20,
    color: colors.primary,
  },
  cloud: {
    ...StyleSheet.absoluteFill,
  },
  icon: {
    width: 98,
    height: 92,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto'
  },
  btnLink: {
    padding: 12,
    color: colors.primary,
    textDecorationLine: 'underline',
  }
});
