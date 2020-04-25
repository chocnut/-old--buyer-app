import { STORE_USER_REQUESTS } from "./request.actionTypes";

const initialState = {
  requests: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_REQUESTS: {
      return {
        ...state,
        requests: [...state.requests, ...action.payload]
      };
    }
    default:
      return state;
  }
};
