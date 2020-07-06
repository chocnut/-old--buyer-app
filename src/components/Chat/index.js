import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform, Button } from "react-native";
import { useSelector } from "react-redux";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { GiftedChat } from "react-native-gifted-chat";
import * as DocumentPicker from "expo-document-picker";

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
          console.log("mmmm", message.attachment);
          message = {
            _id: message._id,
            createdAt: message.createdAt,
            ...(message.text &&
              message.text.length > 0 && { test: message.text }),
            user: message.user,
            ...(message.attachment.file_type.includes("video") && {
              video:
                message.attachment.file_name.substr(
                  0,
                  message.attachment.file_name.lastIndexOf(".")
                ) + ".mp4"
            }),
            ...(message.attachment.file_type.includes("audio") && {
              audio:
                message.attachment.file_name.substr(
                  0,
                  message.attachment.file_name.lastIndexOf(".")
                ) + ".mp3"
            }),
            ...(message.attachment.file_type.includes("image") && {
              image: `https://suppliers.eewoo.io/storage/media/App//Models//RequestThreadAttachment/10/${encodeURI(
                message.attachment.file_name
              )}`
            }),
            ...(message.attachment.file_type.includes("application") && {
              file: `https://suppliers.eewoo.io/storage/media/App//Models//RequestThreadAttachment/10/${encodeURI(
                message.attachment.file_name
              )}`,
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

  const handleUploadFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true
    });

    if (result.type == "success") {
      let { name, size, uri } = result;
      let nameParts = name.split(".");
      let fileType = nameParts[nameParts.length - 1];
      var fileToUpload = {
        name: name,
        size: size,
        uri: uri,
        type: "application/" + fileType
      };
      console.log(fileToUpload, "...............file");
      // this.setState({ file: fileToUpload });
    }
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
        renderActions={() => {
          return (
            <Button
              title="Upload"
              onPress={() => {
                handleUploadFile();
              }}
            />
          );
        }}
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
