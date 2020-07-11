import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from "react-native";
import HeaderSecondary from "../../components/HeaderSecondary";
import SearchFilterBtn from "../../components/SearchFilterBtn";
import SearchInput from "../../components/SearchInput";
import { useSelector } from "react-redux";

import Fire from "../../services/fire";
import colors from "../../constants/Colors";

function Item({ threadId, threadUid, createdAt, navigation, request, userId }) {
  const [newMessage, setNewMessage] = useState("");
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { title, featured_image_url } = request;

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
          imgSrc: featured_image_url,
          createdAt,
          threadUid,
          threadId,
          fromInbox: true,
          onGoBack: () => getThreads()
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

function Inbox({ navigation }) {
  const [search, setSearch] = useState("");
  const [threads, setThreads] = useState([]);
  const selectorUser = useSelector(state => state.user);

  const getThreads = () => {
    Fire.shared.off();
    Fire.shared.onThreadByBuyerId(thread => {
      setThreads(prevThread => [...prevThread, thread]);
    }, selectorUser.id);
  };

  useEffect(() => {
    getThreads();
  }, []);

  if (!threads.length) {
    return (
      <View style={styles.container}>
        <HeaderSecondary
          onPress={() => {
            navigation.goBack();
          }}
          title={"Inbox"}
        ></HeaderSecondary>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.graphite} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderSecondary
        onPress={() => {
          navigation.goBack();
        }}
        title={"Inbox"}
      ></HeaderSecondary>
      <View style={styles.body}>
        <View style={styles.searchFilterContainer}>
          <SearchInput
            value={search}
            onChangeText={value => setSearch(value)}
          />
          <SearchFilterBtn
            active={false}
            onPress={() => console.log("filter")}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={threads}
            renderItem={({ item }) => (
              <Item
                {...item}
                navigation={navigation}
                userId={selectorUser.id}
              />
            )}
            keyExtractor={(item, index) => `${item.threadId}-${index}`}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  searchFilterContainer: {
    height: 46,
    paddingHorizontal: 16,
    alignItems: "stretch",
    backgroundColor: "white",
    flexDirection: "row"
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
    fontFamily: "Quicksand-Regular",
    fontWeight: "500",
    fontSize: 12,
    color: "#FFFFFF"
  }
});

export default Inbox;
