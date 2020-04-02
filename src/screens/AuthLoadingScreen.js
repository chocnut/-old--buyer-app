import React, { useEffect } from "react";
import colors from "../constants/Colors";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { getToken } from "../services/auth";

const AuthLoadingScreen = ({ navigation }) => {
  const checkAuthToken = async () => {
    try {
      const token = await getToken();
      if (token) {
        navigation.navigate("Main");
      } else {
        navigation.navigate("Welcome");
      }
    } catch (error) {
      console.log(error);
      console.log("NO AUTH TOKEN");
      navigation.navigate("Welcome");
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.graphite} />
      <StatusBar barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F03758",
    position: "relative"
  }
});

export default AuthLoadingScreen;
