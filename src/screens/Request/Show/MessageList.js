import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import colors from "../../../constants/Colors";

import Fire from "../../../services/fire";

function Item({
  threadId,
  threadUid,
  request,
  navigation,
  imgSrc,
  createdAt,
  handleBackRequest
}) {
  const [newMessage, setNewMessage] = useState(undefined);

  const getThreads = () => {
    Fire.shared.setPublicId(threadUid);
    Fire.shared.off();
    Fire.shared.on(message => {
      setNewMessage(message);
    }, 1);
  };

  useEffect(() => {
    getThreads();
  }, []);

  if (!newMessage) return null;

  const { title } = request;

  let imagePath = "";
  const { text, attachment } = newMessage;
  const { name, avatar } = newMessage.user;

  if (avatar !== "") {
    const fileName = avatar.split("/");
    imagePath = `https://suppliers.eewoo.io/storage/media/App/User/${
      fileName[fileName.length - 1]
    }`;
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("Chat", {
          requestTitle: title,
          imgSrc,
          createdAt,
          threadUid,
          threadId,
          onGoBack: () => getThreads(),
          onGoBackRequest: () => handleBackRequest()
        })
      }
      style={styles.itemContainer}
    >
      <Image
        style={{
          width: 44,
          height: 44,
          borderRadius: 44 / 2,
          marginLeft: 18,
          marginRight: 12,
          marginVertical: 18
        }}
        source={{ uri: imagePath }}
      />
      <View
        style={{
          flex: 1,
          height: 40,
          marginHorizontal: 12,
          marginVertical: 20
        }}
      >
        <Text>
          {name}{" "}
          <Text
            style={{
              color: "#555064"
            }}
          >
            for
          </Text>{" "}
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              flexShrink: 1,
              color: "#555064"
            }}
          >
            {text || attachment.file_name}
          </Text>
        </View>
      </View>
      <View></View>
    </TouchableOpacity>
  );
}

function MessageList({
  item,
  navigation,
  lastMessage,
  imgSrc,
  createdAt,
  requestPublicId,
  threadId,
  lastUserMessage,
  lastUserMessagePic,
  onRefresh,
  isRefresh,
  threads,
  handleBackRequest
}) {
  const [isFetching, setIsFetching] = useState(isRefresh);

  const handleRefresh = () => {
    setIsFetching(true);
    onRefresh();
    setIsFetching(false);
  };

  if (!threads.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.graphite} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={threads}
        renderItem={({ item }) => (
          <Item
            {...item}
            navigation={navigation}
            handleBackRequest={handleBackRequest}
            imgSrc={imgSrc}
            createdAt={createdAt}
          />
        )}
        keyExtractor={(item, index) => `${item.threadId}-${index}`}
        // onRefresh={handleRefresh}
        // refreshing={isFetching}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4"
  }
});

export default MessageList;
