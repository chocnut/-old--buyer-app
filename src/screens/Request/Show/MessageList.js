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
import { useSelector } from "react-redux";

import Fire from "../../../services/fire";
import colors from "../../../constants/Colors";

function Item({
  threadId,
  threadUid,
  request,
  navigation,
  imgSrc,
  createdAt,
  handleBackRequest,
  userId
}) {
  const [newMessage, setNewMessage] = useState(undefined);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const getThreads = () => {
    setUnreadMessageCount(0);
    Fire.shared.setPublicId(threadUid);
    Fire.shared.off();
    Fire.shared.on(message => {
      setNewMessage(message);
    }, 1);
    Fire.shared.onAll(message => {
      if (message && !message.seen.includes(userId)) {
        setUnreadMessageCount(prev => prev + 1);
      }
    });
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
      {unreadMessageCount > 0 && (
        <View style={styles.itemCount}>
          <Text style={styles.itemCountText}>{unreadMessageCount}</Text>
        </View>
      )}
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
  const selectorUser = useSelector(state => state.user);

  const handleRefresh = () => {
    setIsFetching(true);
    onRefresh();
    setIsFetching(false);
  };

  if (isFetching) {
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
            userId={selectorUser.id}
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
  },
  itemCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 16,
    top: 20,
    bottom: 16,
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: colors.primary
  },
  itemCountText: {
    fontFamily: "Quicksand-Medium",
    fontSize: 12,
    color: "#FFFFFF"
  }
});

export default MessageList;
