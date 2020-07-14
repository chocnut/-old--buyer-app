import * as actionTypes from "./user.actionTypes";

const initialState = {
  email: undefined,
  id: undefined,
  location: undefined,
  countryCode: undefined,
  name: undefined,
  image_file: undefined,
  image_path: undefined,
  bio: undefined,
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
    case actionTypes.UPDATE_USER: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
