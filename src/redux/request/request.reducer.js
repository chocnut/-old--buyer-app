import { STORE_USER_REQUESTS } from "./request.actionTypes";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_REQUESTS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
