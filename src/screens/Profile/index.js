import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { logout } from "../../services/auth";
import HeaderSecondary from "../../components/HeaderSecondary";

const Profile = ({ navigation }) => {
  const handleLogout = () => {
    logout();
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <HeaderSecondary
        onPress={() => {
          navigation.goBack();
        }}
        title="Profile"
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Profile;
