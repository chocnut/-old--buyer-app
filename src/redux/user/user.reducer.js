import * as actionTypes from "./user.actionTypes";

const initialState = {
  email: undefined,
  id: undefined,
  location: undefined,
  name: undefined,
  verified: undefined
};

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
