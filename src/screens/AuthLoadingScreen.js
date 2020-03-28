import React from "react";
import colors from "../constants/Colors";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { getToken } from "../services/auth";

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    this.checkAuthToken();
  };

  checkAuthToken = async () => {
    console.log("checking auth token");

    try {
      const token = await getToken();
      if (token) {
        this.props.navigation.navigate("Main");
      } else {
        this.props.navigation.navigate("Welcome");
      }
    } catch (error) {
      console.log(error);
      console.log("NO AUTH TOKEN");
      this.props.navigation.navigate("Welcome");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.graphite} />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F03758",
    position: "relative"
  }
});
