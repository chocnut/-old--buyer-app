import {
  STORE_USER_REQUESTS,
  TOGGLE_REFRESH,
  TOGGLE_INBOX_NEW_MESSAGE
} from "./request.actionTypes";

const initialState = {
  requests: [
    {
      attributes: {
        title: "Test 3",
        created_at: new Date(),
        public_id: "1",
        featured_image_url:
          "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1626&q=80",
        status: 2
      }
    },
    {
      attributes: {
        title: "Test 2",
        created_at: new Date(),
        public_id: "1",
        featured_image_url:
          "https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        status: 2
      }
    },
    {
      attributes: {
        title: "Test Draft",
        created_at: new Date(),
        public_id: "1",
        featured_image_url:
          "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
        status: 1
      }
    }
  ],
  isRefreshing: false,
  isNewUnreadMessage: false
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
        requests: sortSelector([...state.requests, ...action.payload]),
        isRefreshing: false
      };
    }
    case TOGGLE_REFRESH: {
      return { ...state, isRefreshing: !state.isRefreshing };
    }
    case TOGGLE_INBOX_NEW_MESSAGE: {
      return { ...state, isNewUnreadMessage: !state.isNewUnreadMessage };
    }
    default:
      return state;
  }
};
