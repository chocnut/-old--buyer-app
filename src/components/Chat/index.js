import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useSelector } from "react-redux";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { GiftedChat } from "react-native-gifted-chat";

import Fire from "./../../services/fire";
import Message from "./Message";

const BOTTOM_OFFSET = Platform.OS === "ios" ? 300 + getBottomSpace() : 0;

const Chat = ({ item }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(undefined);
  const selectorUser = useSelector(state => state.user);

  useEffect(() => {
    // Fire.shared.setPublicId(item.id);
    Fire.shared.setPublicId("455cabc9-b655-41b0-91e3-b76867e45560");
    Fire.shared.setUserId(selectorUser.id);
    Fire.shared.off();
    Fire.shared.on(message => {
      setMessages(prevMessages => {
        if (message.attachment) {
          message = {
            _id: message._id,
            createdAt: message.createdAt,
            ...(message.text &&
              message.text.length > 0 && { test: message.text }),
            user: message.user,
            ...(message.attachment.file_type.includes("video") && {
              video: message.attachment.media_path
            }),
            ...(message.attachment.file_type.includes("image") && {
              // image: message.attachment.media_path
              //image: "https://facebook.github.io/react/img/logo_og.png"
              image:
                "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }),
            ...(message.attachment.file_type.includes("application") && {
              file: message.attachment.media_path,
              fileType: message.attachment.file_type
            })
          };
        }
        console.log(message);
        return GiftedChat.append(prevMessages, message);
      });
    });

    // setMessages(
    //   {
    //     _id: 1,
    //     text: "Will find out!",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any"
    //     }
    //   },
    //   {
    //     _id: 3,
    //     text: "Will find out!",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any"
    //     }
    //   },
    //   {
    //     _id: 3,
    //     text:
    //       "👍 Sure! We can easily brand your products so that they will become unique",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any"
    //     }
    //   }
    // ]);

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
