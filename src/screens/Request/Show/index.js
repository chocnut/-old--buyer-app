import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import Constants from "expo-constants";

import { useSelector } from "react-redux";
import { TabView, TabBar } from "react-native-tab-view";
import { fetchRequestThread } from "../../../services/request";
import HeaderSecondary from "../../../components/HeaderSecondary";
import MessageList from "./MessageList";
import RequestDetails from "./RequestDetails";
import Quotes from "./Quotes";

import Fire from "../../../services/fire";

const initialLayout = { width: Dimensions.get("window").width };

export default function Show({ route, navigation }) {
  const [index, setIndex] = useState(0);
  const [lastMessage, setLastMessage] = useState(undefined);
  const [lastUserMessage, setLastUserMessage] = useState(undefined);
  const { item, imgSrc, createdAt, requestPublicId } = route.params;
  const selectorUser = useSelector(state => state.user);

  //Temporary
  const [threadPublicId, setThreadPublicId] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);

  const getThreads = async () => {
    const threads = await fetchRequestThread(item.id);
    if (threads.length > 0) {
      const thread = threads[threads.length - 1];
      setThreadId(thread.id);
      setThreadPublicId(thread.public_id);
    }
  };

  useEffect(() => {
    getThreads();
    // Fire.shared.onThread(thread => {
    //   console.log("thread event", thread);
    // });
  }, []);

  useEffect(() => {
    if (threadPublicId) {
      Fire.shared.setPublicId(threadPublicId);
      Fire.shared.setUserId(selectorUser.id);
      Fire.shared.off();
      Fire.shared.on(message => {
        setLastUserMessage(message.user.name);
        if (message.attachment) {
          setLastMessage("A file attachment");
        } else {
          setLastMessage(message.text);
        }
      }, 1);
    }
  }, [threadPublicId, threadId]);

  const [routes] = useState([
    { key: "messages", title: "Messages" },
    { key: "quotes", title: "Quotes" },
    { key: "request", title: "Request" }
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "messages":
        if (!threadId) return null;
        return (
          <MessageList
            item={item}
            navigation={navigation}
            lastMessage={lastMessage}
            lastUserMessage={lastUserMessage}
            createdAt={createdAt}
            imgSrc={imgSrc}
            requestPublicId={threadPublicId}
            threadId={threadId}
          />
        );
      case "request":
        return <RequestDetails {...item} />;
      case "quotes":
        return <Quotes />;
      default:
        return null;
    }
  };

  const keyboardAvoidingViewBehavior = Constants.platform.ios
    ? "padding"
    : "height";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={keyboardAvoidingViewBehavior}
      enabled
    >
      <HeaderSecondary
        onPress={() => {
          navigation.goBack();
        }}
        title={item.attributes.title}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabContainer}
        renderTabBar={props => (
          <TabBar
            {...props}
            tabStyle={styles.tabStyle}
            labelStyle={styles.tabLabel}
            activeColor="#555064"
            inactiveColor="#9996A2"
            indicatorStyle={styles.indicator}
            indicatorContainerStyle={styles.indicator}
          />
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  scene: {
    flex: 1
  },
  tabStyle: {
    backgroundColor: "white"
  },
  tabLabel: {
    fontFamily: "Quicksand-Medium",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize"
  },
  indicator: {
    backgroundColor: "white"
  }
});
