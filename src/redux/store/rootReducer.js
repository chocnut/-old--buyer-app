import { combineReducers } from "redux";
import { CLEAR_STORE } from "../auth/auth.actionTypes";

import authReducer from "../auth/auth.reducer";
import userReducer from "../user/user.reducer";
import userRequestsReducer from "../request/request.reducer";
import wizardReducer from "../request/wizard/wizard.reducer";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  requests: userRequestsReducer,
  wizard: wizardReducer
});

export default (state, action) => {
  //   if (action.type === CLEAR_STORE.REQUEST) {
  //     state = undefined;
  //   }
  return appReducer(state, action);
};
