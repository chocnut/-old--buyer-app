import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
  Alert
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppLoading, ScreenOrientation, SplashScreen, Linking } from "expo";

import * as Font from "expo-font";

import { Asset } from "expo-asset";
import AppNavigator from "./navigation/AppNavigator";
import AlertModal from "./components/AlertModal";
import Loading from "./components/Loading";
import { create } from "mobx-persist";
import AppStore from "./mobx/store";
import api from "./api";
// import firebase from "react-native-firebase";
const hydrate = create({ storage: AsyncStorage, jsonify: true });
const appStore = new AppStore();
hydrate("appStore", appStore);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    alert: {},
    loading: false
  };

  componentDidMount = async () => {
    console.log("loading app...");
    // ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
    this.closeAlert();
  };

  componentWillUnmount() {
    //this.unsubscribe();
  }

  handleIncomingURL = async url => {
    let { path, queryParams } = Linking.parse(url);
    if (path) {
      let { path, queryParams } = Linking.parse(url);
      Alert.alert(
        path,
        JSON.stringify(queryParams),
        [
          {
            text: "Ask me later",
            onPress: () => console.log("Ask me later pressed")
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );

      if (url === "https://app.expo.io/reset-password") {
        const urlObject = new URL(url);
        const token = urlObject.searchParams.get("token");
        const email = urlObject.searchParams.get("email");

        if (email && token) {
        }
      }
    }
  };

  showAlert = async alert => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setState({ alert });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  closeAlert = () => {
    this.showAlert({
      visible: false,
      image: null,
      title: "",
      body: "",
      btnText: "",
      secondaryText: "",
      onClose: null,
      onAccept: null,
      allowClose: false
    });
  };

  setLoading = loading => {
    this.setState({ loading });
  };

  handleError = async e => {
    console.log(e);
    api.postToSlack(JSON.stringify(e), "Error");
    //firebase.crashlytics().log(JSON.stringify(e));
    //firebase.crashlytics().recordError(3, "General error handler");

    const err = JSON.parse(JSON.stringify(e));
    let title = "Uh oh!";
    let body = `An error occurred. Perhaps you're offline? Please try again later.`;
    if (err.response) {
      console.log("/////////////////////////// RESPONSE");
      console.log(err.response);
    } else if (typeof err === "string" && err.includes("Missing field")) {
      console.log(err);
      title = "Required fields";
      body = "Please complete all required fields";
    }

    await this.showAlert({
      visible: true,
      image: require("./assets/images/sad.png"),
      title,
      body,
      btnText: "OK",
      onClose: this.closeAlert,
      onAccept: this.closeAlert,
      allowClose: false
    });
  };

  render() {
    const { showAlert, closeAlert, handleError, setLoading } = this;
    const screenProps = {
      showAlert,
      closeAlert,
      handleError,
      setLoading,
      appStore
    };
    const alert = this.state.alert;

    if (this.state.isLoadingComplete) {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}

          <AlertModal
            image={alert.image}
            title={alert.title}
            body={alert.body}
            btnText={alert.btnText}
            secondaryText={alert.secondaryText}
            isVisible={alert.visible}
            onClose={alert.onClose}
            onAccept={alert.onAccept}
            onCancel={closeAlert}
            allowClose={alert.allowClose}
          />

          <Loading isVisible={this.state.loading} />
          <NavigationContainer>
            <AppNavigator screenProps={screenProps} />
          </NavigationContainer>
        </View>
      );
    }

    return (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        autoHideSplash={false}
      />
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/add.png"),
        require("./assets/images/add-camera.png"),
        require("./assets/images/add-image.png"),
        require("./assets/images/add-request.png"),
        require("./assets/images/camera.png"),
        require("./assets/images/camera_icon.png"),
        require("./assets/images/chat.png"),
        require("./assets/images/check-icon.png"),
        require("./assets/images/check.png"),
        require("./assets/images/close.png"),
        require("./assets/images/close_dark.png"),
        require("./assets/images/cloud-aero-red.png"),
        require("./assets/images/cloud-aero-white.png"),
        require("./assets/images/cloud.png"),
        require("./assets/images/delete.png"),
        require("./assets/images/edit.png"),
        require("./assets/images/edit_pencil.png"),
        require("./assets/images/eye-cross.png"),
        require("./assets/images/eye.png"),
        require("./assets/images/folder.png"),
        require("./assets/images/icon.png"),
        require("./assets/images/image.png"),
        require("./assets/images/loader.png"),
        require("./assets/images/logo-red.png"),
        require("./assets/images/logo-white.png"),
        require("./assets/images/nextBtn.png"),
        require("./assets/images/packaging.png"),
        require("./assets/images/photo.png"),
        require("./assets/images/placeholder.png"),
        require("./assets/images/quality.png"),
        require("./assets/images/sad.png"),
        require("./assets/images/search.png"),
        require("./assets/images/sent-icon.png"),
        require("./assets/images/sketch.png"),
        require("./assets/images/sketch-red.png"),
        require("./assets/images/splash.png"),
        require("./assets/images/tracking.png"),
        require("./assets/images/trash.png"),
        require("./assets/images/up_arrow.png"),
        require("./assets/images/undo.png"),
        require("./assets/images/upload.png"),
        require("./assets/images/wallet.png")
      ]),
      Font.loadAsync({
        QuicksandMedium: require("./assets/fonts/Quicksand-Medium.ttf"),
        QuicksandRegular: require("./assets/fonts/Quicksand-Regular.ttf"),
        QuicksandBold: require("./assets/fonts/Quicksand-Bold.ttf"),
        QuicksandLight: require("./assets/fonts/Quicksand-Light.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textInputView: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textInputButton: {
    flexShrink: 1
  }
});
