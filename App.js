import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import { AppLoading, SplashScreen } from "expo";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingError = error => {
    console.warn(error);
  };

  const handleFinishLoading = () => {
    setIsLoading({ isLoadingComplete: true });
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  };

  const loadResourcesAsync = async () => {
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

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          {!isLoading && <Text>App Loaded</Text>}
          {isLoading && (
            <AppLoading
              startAsync={loadResourcesAsync}
              onError={handleLoadingError}
              onFinish={handleFinishLoading}
              autoHideSplash={false}
            />
          )}
        </View>
      </PersistGate>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
