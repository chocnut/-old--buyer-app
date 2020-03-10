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


export default class EmailSendingFailureScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />

        <Text style={styles.title}>
          Oh no - we’re sorry you’re {"\n"}
          having problems with that!
        </Text>
        <Text style={styles.text}>
          Have you checked your spam folder? {"\n"}
          If it’s not there, please wait for at least 10 minutes & try again. If that doesn’t work, 
          try again with the new email address.
        </Text>

        <DashedCloud style={styles.cloud}>
          <Image style={styles.icon}
            width={100}
            height={98}
            source={require('../../../assets/images/sad.png')} />
        </DashedCloud>

        <SafeAreaView style={styles.footer}>
          <Btn onPress={()=>{}} title="TRY ANOTHER EMAIL" primary width={190}>TRY ANOTHER EMAIL</Btn>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
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
