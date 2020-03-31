import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/Colors";

function CreateNewRequestBtn(props) {
  return (
    <SafeAreaView
      style={styles.container}>
      <TouchableOpacity
        title={'Create New Request'}
        onPress={props.onPress}
        activeOpacity={0.8}
        style={styles.btn}>
        <Image source={require('../../assets/images/add.png')} style={styles.icon} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CreateNewRequestBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 16,
    bottom: 16,
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
    backgroundColor: colors.primary
  },
  icon: {
    width: 16,
    height: 16,
  }
})

