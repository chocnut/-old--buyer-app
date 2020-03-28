import * as actionTypes from "./user.actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_USER: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
