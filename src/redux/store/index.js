import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
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
  const middleware = [thunk];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export const { store, persistor } = configureStore();
