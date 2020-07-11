import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../constants/Colors";
import Constants from "expo-constants";

import HeaderSecondary from "../../components/HeaderSecondary";
import Chat from "../../components/Chat";
import ChatRequestBtn from "../../components/ChatRequestBtn";
import { format } from "date-fns";

const requestData = ({ imgSrc, requestTitle, createdAt }) => ({
  img: imgSrc,
  type: "request",
  title: requestTitle,
  date: format(new Date(createdAt), "dd MMMM Y")
});

export default class ChatScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
          threadUid={this.props.route.params.threadUid}
          threadId={this.props.route.params.threadId}
        />
      </View>
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
