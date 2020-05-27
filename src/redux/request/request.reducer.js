import { STORE_USER_REQUESTS, TOGGLE_REFRESH } from "./request.actionTypes";

const initialState = {
  requests: [],
  isRefreshing: false
};

const sortSelector = data => {
  return data.sort((a, b) => {
    return (
      new Date(b.attributes.created_at) - new Date(a.attributes.created_at)
    );
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_REQUESTS: {
      return {
        ...state,
        isRefreshing: false,
        requests: state.isRefreshing
          ? sortSelector([...action.payload])
          : sortSelector([...state.requests, ...action.payload])
      };
    }
    case TOGGLE_REFRESH: {
      return { ...state, isRefreshing: !state.isRefreshing };
    }
    default:
      return state;
  }
};
