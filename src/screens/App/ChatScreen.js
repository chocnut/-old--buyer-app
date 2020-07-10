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
import ChatRequestBtn from "../../components/ChatRequestBtn";
import { format } from "date-fns";

const requestData = ({ imgSrc, request, createdAt }) => ({
  img: imgSrc,
  type: "request",
  title: request,
  date: format(new Date(createdAt), "dd MMMM Y")
});

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

        <ChatRequestBtn
          data={requestData(this.props.route.params)}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />

        <Chat
          requestPublicId={this.props.route.params.requestPublicId}
          threadId={this.props.route.params.threadId}
        />
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
