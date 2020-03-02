import { createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const middleware = null;

  const composeEnhancers = __DEV__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

  const store = createStore(persistedReducer);
  const persistor = persistStore(store);

  return { store, persistor };
}

export const { store, persistor } = configureStore();
