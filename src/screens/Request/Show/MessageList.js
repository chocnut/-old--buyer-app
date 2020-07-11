import React, { useState } from "react";
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

function Item({
  requestPublicId,
  threadId,
  name,
  request,
  lastMessage,
  lastUserMessagePic,
  navigation,
  imgSrc,
  createdAt
}) {
  // Temporary fix
  let imagePath = "";
  if (lastUserMessagePic) {
    const fileName = lastUserMessagePic.split("/");
    imagePath = `https://suppliers.eewoo.io/storage/media/App/User/${
      fileName[fileName.length - 1]
    }`;
  }

  if (!threadId) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("Chat", {
          request,
          imgSrc,
          createdAt,
          requestPublicId,
          threadId
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
          {request}
        </Text>
        <Text
          style={{
            color: "#555064"
          }}
        >
          {lastMessage}
        </Text>
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
  isRefresh
}) {
  const [isFetching, setIsFetching] = useState(isRefresh);

  const handleRefresh = () => {
    setIsFetching(true);
    onRefresh();
    setIsFetching(false);
  };

  if (!lastMessage) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.graphite} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          {
            id: Math.random(),
            name: lastUserMessage,
            request: item.attributes.title,
            lastMessage,
            lastUserMessagePic
          }
        ]}
        renderItem={({ item }) => (
          <Item
            {...item}
            navigation={navigation}
            imgSrc={imgSrc}
            createdAt={createdAt}
            requestPublicId={requestPublicId}
            threadId={threadId}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onRefresh={handleRefresh}
        refreshing={isFetching}
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
