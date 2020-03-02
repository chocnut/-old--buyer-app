import { combineReducers } from "redux";
import { CLEAR_STORE } from "../auth/auth.actionTypes";

import authReducer from "../auth/auth.reducer";

const appReducer = combineReducers({
  auth: authReducer
});

export default (state, action) => {
  //   if (action.type === CLEAR_STORE.REQUEST) {
  //     state = undefined;
  //   }
  return appReducer(state, action);
};
