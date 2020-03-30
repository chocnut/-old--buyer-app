import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Btn from "../../components/Btn";
import { logout } from "../../services/auth";

const MainScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Main Screen</Text>
        <Btn onPress={handleLogout} title="Login" secondary width={196}>
          Logout
        </Btn>
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
