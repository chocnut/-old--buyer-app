import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useSelector } from "react-redux";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { GiftedChat } from "react-native-gifted-chat";

import Fire from "./../../services/fire";
import Message from "./Message";

const BOTTOM_OFFSET = Platform.OS === "ios" ? 300 + getBottomSpace() : 0;

const Chat = ({ requestPublicId }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(undefined);
  const selectorUser = useSelector(state => state.user);

  useEffect(() => {
    // Fire.shared.setPublicId(requestPublicId);
    // Fire.shared.setUserId(selectorUser.id);
    // Fire.shared.off();
    // Fire.shared.on(message => {
    //   setMessages(prevMessages => GiftedChat.append(prevMessages, message));
    // });

    setMessages([
      {
        _id: 1,
        text: "Will find out!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        }
      },
      {
        _id: 3,
        text: "Will find out!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        }
      },
      {
        _id: 3,
        text:
          "👍 Sure! We can easily brand your products so that they will become unique",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        }
      }
    ]);

    setUser({
      name: selectorUser.name,
      email: selectorUser.email,
      avatar: "",
      id: selectorUser.id,
      _id: Fire.shared.uid,
      isCurrentUser: true
    });
  }, []);

  const handleSend = val => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, val));
  };

  const renderMessage = props => {
    return <Message {...props} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        bottomOffset={BOTTOM_OFFSET}
        messages={messages}
        //onSend={Fire.shared.send}
        onSend={handleSend}
        user={user}
        renderMessage={renderMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginVertical: 10
  }
});

export default Chat;
