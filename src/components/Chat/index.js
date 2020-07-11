import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { useSelector } from "react-redux";
import { GiftedChat, Send } from "react-native-gifted-chat";
import * as DocumentPicker from "expo-document-picker";

import { messageFileUpload } from "../../services/request";

import Fire from "./../../services/fire";
import Message from "./Message";
import colors from "../../constants/Colors";

const Chat = ({ threadId, threadUid }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(undefined);
  const selectorUser = useSelector(state => state.user);

  useEffect(() => {
    Fire.shared.setPublicId(threadUid);
    Fire.shared.off();
    Fire.shared.onAll(message => {
      if (!message.seen[selectorUser.id]) {
        handleSeen(message);
      }
      setMessages(prevMessages => {
        if (message.attachment) {
          message = {
            _id: message._id,
            createdAt: message.createdAt,
            ...(message.text &&
              message.text.length > 0 && { text: message.text }),
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
              image: `https://suppliers.eewoo.io/storage/media/App//Models//RequestThreadAttachment/${threadId}/${encodeURI(
                message.attachment.file_name
              )}`
            }),
            ...(message.attachment.file_type.includes("application") && {
              file: `https://suppliers.eewoo.io/storage/media/App//Models//RequestThreadAttachment/${threadId}/${encodeURI(
                message.attachment.file_name
              )}`,
              fileName: message.attachment.file_name,
              fileType: message.attachment.file_type
            })
          };
        }
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
  }, [threadId, threadUid]);

  const handleSeen = message => {
    console.log(message);
    const payload = {
      timestamp: message.timestamp,
      seen: [...message.seen, selectorUser.id]
    };
    Fire.shared.setMessageId(message._id);
    Fire.shared.setPublicId(threadUid);
    Fire.shared.update(payload);
  };

  const handleSend = async data => {
    data[0]["seen"] = [selectorUser.id];
    Fire.shared.send(data);
  };

  const renderMessage = props => {
    return <Message threadId={threadId} {...props} />;
  };

  const handleUploadFile = async data => {
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
      const response = await messageFileUpload(fileToUpload, threadId);
      if (response && response.attachment) {
        const payload = {
          text: "",
          user,
          attachment: response.attachment,
          seen: [selectorUser.id]
        };
        Fire.shared.send([payload]);
      }
    }
    return false;
  };

  if (!messages.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.graphite} />
      </View>
    );
  }

  return (
    <>
      <GiftedChat
        placeholder={"Message"}
        onSend={handleSend}
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
    </>
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
