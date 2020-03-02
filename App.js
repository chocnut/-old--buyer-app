import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
// import { Asset } from "expo-asset";
// import { AppLoading } from "expo";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <Text>Test</Text>
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
