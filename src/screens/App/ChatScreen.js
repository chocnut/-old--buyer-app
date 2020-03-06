import React, { Children } from "react";
import HeaderBtn from "../../components/HeaderBtn";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import colors from "../../constants/Colors";
import Constants from "expo-constants";

import HeaderSecondary from "../../components/HeaderSecondary";
import Chat from "../../components/Chat";
import ChatMessageInput from "../../components/ChatMessageInput";
import ChatRequestBtn from "../../components/ChatRequestBtn";

let requestMockData = {
  img: require("../../../assets/images/icon.png"),
  type: "request",
  title:
    "Mini Portable Projector Mini Portable Projector Mini Portable Projector",
  date: "12 Mar 2019"
};

let mockData = [
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Mark Liu",
    message:
      "Hello Johnatan! I saw your request and I think our company can help you with this bags. Tell me please - are you going to add some branding ?",
    date: "Nov 1, 2019",
    time: "0:01 AM"
  },
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Me",
    message:
      "Hi! Yes, it is the main feature I’m looking for. I know that it is not very expensive.",
    date: "Nov 1, 2019",
    time: "0:01 AM"
  },
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Me",
    message: "Do you have this option?",
    date: "Nov 1, 2019",
    time: "0:01 AM"
  },
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Mark Liu",
    message:
      "👍 Sure! We can easily brand your products so that they will become unique",
    date: "Nov 2, 2019",
    time: "0:01 AM"
  },
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Mark Liu",
    message: "Will find out!",
    date: "Nov 2, 2019",
    time: "0:01 AM"
  },
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Mark Liu",
    message: "Will find out!",
    attachment: {
      type: "pdf"
    },
    date: "Nov 2, 2019",
    time: "0:01 AM"
  },
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Me",
    message:
      "Are you sure that it is a correct price?! I think here are a few extra zeros! You should check it ASAP! 👿",
    date: "Nov 2, 2019",
    time: "0:01 AM"
  },
  {
    avatar: require("../../../assets/images/icon.png"),
    userName: "Mark Liu",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, iste inventore quod quis illo dolor veniam vitae ad molestiae nesciunt! Tenetur fugit in beatae ab accusamus reprehenderit temporibus nam quis.",
    date: "Nov 2, 2019",
    time: "0:01 AM"
  }
];

export default class ChatScreen extends React.Component {
  render() {
    const keyboardAvoidingViewBehavior = Constants.platform.ios
      ? "padding"
      : "height";

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={keyboardAvoidingViewBehavior}
        enabled
      >
        <HeaderSecondary
          onPress={() => {
            this.props.navigation.goBack();
          }}
          title="Inbox"
        />

        <ChatRequestBtn data={requestMockData} />

        <Chat data={mockData} />

        <ChatMessageInput />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: colors.secondary,
    height: Constants.statusBarHeight
  },
  header: {
    height: 64,
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
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});