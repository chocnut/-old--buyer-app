import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { useSelector } from "react-redux";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { GiftedChat, Send } from "react-native-gifted-chat";
import * as DocumentPicker from "expo-document-picker";

import { messageFileUpload } from "../../services/request";

import Fire from "./../../services/fire";
import Message from "./Message";

const BOTTOM_OFFSET = Platform.OS === "ios" ? 300 + getBottomSpace() : 0;

const Chat = ({ item }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(undefined);
  const [fileToUpload, setFileToUpload] = useState(undefined);
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

    setUser({
      name: selectorUser.name,
      email: selectorUser.email,
      avatar: "",
      id: selectorUser.id,
      _id: Fire.shared.uid,
      isCurrentUser: true
    });
  }, []);

  const handleSend = async data => {
    if (fileToUpload) {
      const response = await messageFileUpload(fileToUpload, 10);
      console.log("fileUploadResponse", response);
      if (response && response.attachment) {
        data[0]["attachment"] = response.attachment;
        Fire.shared.send(data);
      }
    } else {
      Fire.shared.send(data);
    }
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
      let { name, uri } = result;
      let nameParts = name.split(".");
      let fileType = nameParts[nameParts.length - 1];
      var fileToUpload = {
        name,
        uri,
        type: `application/${fileType}`
      };
      setFileToUpload(fileToUpload);
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        onSend={handleSend}
        bottomOffset={BOTTOM_OFFSET}
        messages={messages}
        user={user}
        renderMessage={renderMessage}
        renderSend={props => {
          return (
            <Send {...props} containerStyle={styles.sendBtnContainer}>
              <Image source={require("../../../assets/images/send.png")} />
            </Send>
          );
        }}
        renderActions={props => {
          return (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.fileUpload}
                onPress={handleUploadFile}
              >
                <Image
                  source={require("../../../assets/images/add-file.png")}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginVertical: 10
  },
  btnContainer: {
    // flex: 1
    // alignItems: "center"
  },
  sendBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 15
  },
  fileUpload: {
    padding: 10
  }
});

export default Chat;
