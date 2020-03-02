import React from "react";
import { observer } from "mobx-react";
import colors from "../constants/Colors";
import moment from "moment";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
// import { Constants } from "expo-constants";

@observer
export default class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
    //this.showAlert = this.props.screenProps.showAlert;
    //this.closeAlert = this.props.screenProps.closeAlert;
    // this.handleError = this.props.screenProps.handleError;
    // this.setLoading = this.props.screenProps.setLoading;
    // this.store = this.props.screenProps.appStore;

    // store a ref to the model name, if ios
    // if (Constants.platform.ios) {
    //   const model = Constants.isDevice
    //     ? Constants.platform.ios.model
    //     : Constants.deviceName;
    //   const isIphoneX =
    //     model.toLowerCase().includes("iphone") &&
    //     model.toLowerCase().includes("x");
    //   this.store.setDeviceIsIphoneX(isIphoneX);
    // }

    this.checkAuthToken();
  };

  checkAuthToken = async () => {
    console.log("checking auth token");
    const auth = ""; //this.store.auth;
    const user_has_token = auth && auth.token;

    let token_is_valid = true;
    if (user_has_token) {
      // if the user has a token, check that it isn't going to expire in the next 24 hours
      const cutoff = moment().add(1, "d");
      token_is_valid =
        auth.token_expires && moment(auth.token_expires).isAfter(cutoff);
    } else {
      console.log("NO AUTH TOKEN");
    }

    // this.props.navigation.navigate(
    //   user_has_token && token_is_valid ? "Requests" : "AuthHome"
    // );
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
    justifyContent: "center"
  }
});
