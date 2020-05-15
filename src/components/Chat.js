import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useSelector } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";
import { getBottomSpace } from "react-native-iphone-x-helper";

// import ChatMessageInput from "./ChatMessageInput";
import Fire from "./../services/fire";

const BOTTOM_OFFSET = Platform.OS === "ios" ? 58 + getBottomSpace() : 0;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(undefined);
  const selectorUser = useSelector(state => state);

  useEffect(() => {
    Fire.shared.off();
    Fire.shared.on(message => {
      setMessages(prevMessages => GiftedChat.append(prevMessages, message));
    });

    setUser({
      name: selectorUser.name,
      email: selectorUser.email,
      avatar: "",
      id: selectorUser.id,
      _id: Fire.shared.uid
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        bottomOffset={BOTTOM_OFFSET}
        onSend={Fire.shared.send}
        user={user}
        minInputToolbarHeight={55}
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
