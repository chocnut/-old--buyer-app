import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import Constants from "expo-constants";

import { useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import HeaderSecondary from "../../../components/HeaderSecondary";
import MessageList from "./MessageList";
import RequestDetails from "./RequestDetails";
import Quotes from "./Quotes";

import Fire from "../../../services/fire";

const initialLayout = { width: Dimensions.get("window").width };

export default function Show({ route, navigation }) {
  const [index, setIndex] = useState(0);
  const [lastMessage, setLastMessage] = useState(undefined);
  const { item, imgSrc, createdAt, requestPublicId } = route.params;
  const selectorUser = useSelector(state => state.user);

  useEffect(() => {
    //455cabc9-b655-41b0-91e3-b76867e45560
    Fire.shared.setPublicId("455cabc9-b655-41b0-91e3-b76867e45560");
    Fire.shared.setUserId(selectorUser.id);
    Fire.shared.off();
    Fire.shared.on(message => {
      if (message.attachment) {
        setLastMessage("A file attachment");
      } else {
        setLastMessage(message.text);
      }
    }, 1);
  }, []);

  const [routes] = useState([
    { key: "messages", title: "Messages" },
    { key: "quotes", title: "Quotes" },
    { key: "request", title: "Request" }
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "messages":
        return (
          <MessageList
            item={item}
            navigation={navigation}
            lastMessage={lastMessage}
            createdAt={createdAt}
            imgSrc={imgSrc}
            requestPublicId={requestPublicId}
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
