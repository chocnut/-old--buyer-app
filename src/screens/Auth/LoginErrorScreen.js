import React from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Linking
} from "react-native";
import CloudFooter from "../../components/CloudFooter";
import Layout from "../../constants/Layout";
import colors from "../../constants/Colors";
import Btn from "../../components/Btn";

@observer
export default class LogInErrorScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  email = () => {
    Linking.openURL("mailto:hello@eewoo.io");
  };

  login = () => {
    this.props.navigation.navigate("LogIn");
  };

  render() {
    const imgWidth = Layout.window.width;
    const imgHeight = Math.round(imgWidth * (837 / 1500));

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.content}>
          <Text style={[styles.title, styles.titleRed]}>Login failed</Text>
          <TouchableOpacity onPress={this.email} activeOpacity={0.8}>
            <Text style={styles.textLink}>
              Please try again or contact{" "}
              <Text style={styles.hlink}>hello@eewoo.io</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <CloudFooter color="red" width={imgWidth} height={imgHeight}>
          <Btn onPress={this.login} title="Login" secondary width={196}>
            Try again
          </Btn>
        </CloudFooter>
        <StatusBar barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
    position: "relative"
  },
  content: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingLeft: 33,
    paddingRight: 33
  },
  logo: {
    width: 165,
    height: 62,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: -20
  },
  title: {
    fontSize: 24,
    fontFamily: "QuicksandMedium",
    color: colors.graphite,
    textAlign: "center",
    marginTop: 20
  },
  titleRed: {
    color: colors.red,
    marginTop: 0
  },
  textLink: {
    fontSize: 13,
    fontFamily: "QuicksandRegular",
    color: colors.graphite,
    padding: 8,
    textAlign: "center"
  },
  hlink: {
    textDecorationLine: "underline",
    fontFamily: "QuicksandBold",
    color: colors.red
  }
});
