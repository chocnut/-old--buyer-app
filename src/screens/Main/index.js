import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Main Screen</Text>
      </View>
    </View>
  );
};

export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    position: "relative"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
