import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import colors from "../constants/Colors";

function CreateNewRequestHelper() {
  return (
    <View style={styles.container}>
      <View style={{flexGrow: 1}}></View>
      <Image
        style={styles.icon}
        source={require('../../assets/images/folder.png')} />
      <Text style={styles.title}>
        Create new request
      </Text>
      <Text style={styles.text}>
        Please press the plus button {'\n'}
        to create your first request
      </Text>
      <SafeAreaView
        style={styles.arrowHolder}>
        <View
          style={styles.arrowInner}>
          <Image source={require('../../assets/images/long-dashed-arrow.png')}
            style={styles.arrow}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default CreateNewRequestHelper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 117,
    height: 102,
    marginBottom: 48,
    marginTop: -100
  },
  title: {
    color: colors.secondary,
    fontFamily: "Quicksand-Medium",
    marginBottom: 12,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
  },
  text: {
    color: colors.secondary,
    fontFamily: "Quicksand-Regular",
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
  },
  arrowHolder: {
    flex: 1,
    display: 'flex',
    width: '51%',
    alignSelf: 'flex-end',
  },
  arrowInner: {
    flexGrow: 1,
    resizeMode: 'stretch',
    paddingRight: 74, // buttonSize 54 + button margin 16 + arrow margin 4
    paddingBottom: 60, // buttonSize 54 + button margin 16 - arrow margin 4
  },
  arrow: {
    flexGrow: 1,
    resizeMode: 'stretch',
    width: 'auto',
    height: 'auto',
  },
})

