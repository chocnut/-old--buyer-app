import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";

function Item({ name, request, lastMessage, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate("Chat")}
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
        source={require("../../../../assets/images/avatar/avatar.png")}
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
          {name}: {lastMessage}
        </Text>
      </View>
      <View></View>
    </TouchableOpacity>
  );
}

function MessageList({ item, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          {
            id: Math.random(),
            name: "Mark L",
            request: item.attributes.title,
            lastMessage: "👌 Seems like we are going... "
          },
          {
            id: Math.random(),
            name: "John Doe!",
            request: item.attributes.title,
            lastMessage: "🤷‍♂️ Seems like we are going... "
          },
          {
            id: Math.random(),
            name: "John Doe!",
            request: item.attributes.title,
            lastMessage: "🤷‍♂️ Seems like we are going... "
          },
          {
            id: Math.random(),
            name: "John Doe!",
            request: item.attributes.title,
            lastMessage: "🤷‍♂️ Seems like we are going... "
          }
        ]}
        renderItem={({ item }) => <Item {...item} navigation={navigation} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
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
