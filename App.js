import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import { AppLoading } from "expo";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import AppNavigator from "./src/navigation";

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingError = error => {
    console.warn(error);
  };

  const handleFinishLoading = () => {
    setLoadingComplete(true);
  };

  const loadImages = () => {
    return Asset.loadAsync([
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
    ]);
  };

  const loadFonts = () => {
    return Font.loadAsync({
      "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
      "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
      "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
      "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf")
    });
  };

  const loadAssets = async () => {
    const image = await loadImages();
    const fonts = await loadFonts();

    return Promise.all(image, fonts);
  };

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadAssets}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  } else {
    return (
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </PersistGate>
      </ReduxProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
