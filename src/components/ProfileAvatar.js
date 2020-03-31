import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import HeaderBtn from "./HeaderBtn";
import colors from "../constants/Colors";
import HeaderBackground from "./HeaderBackground";
const editIcon = require('../../assets/images/edit-icon.png')
const plusIcon = require('../../assets/images/add.png')
const avatarPlaceholder = require('../../assets/images/avatar-placeholder.png')

export default class ProfileAvatar extends React.Component {
  render() {
    const icon = this.props.avatar ? editIcon : plusIcon;
    const avatarSource = this.props.avatar ? {uri: this.props.avatar} : avatarPlaceholder;
    const avatarStyle = this.props.avatar ? styles.avatar : styles.avatarPlaceholder;

    return (
      <View style={styles.container}>
        <View style={styles.holder}>
          <Image source={avatarSource} style={avatarStyle}/>
          {this.props.onPress && <TouchableOpacity
            style={styles.btn}
            onPress={this.props.onPress}
            activeOpacity={0.8}
          >
            <Image source={icon} style={styles.btnIcon}/>
          </TouchableOpacity>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  holder: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    backgroundColor: '#F2F2F2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
  },
  avatarPlaceholder: {
    width: 55,
    height: 55
  },
  btn: {
    width: 36,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  btnIcon: {
    width: 18,
    height: 18
  },
});
