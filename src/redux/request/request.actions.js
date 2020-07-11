import {
  STORE_USER_REQUESTS,
  TOGGLE_REFRESH,
  TOGGLE_INBOX_NEW_MESSAGE
} from "./request.actionTypes";
import { fetchUserRequests } from "../../services/request";

export const toggleInboxNewMessage = () => ({ type: TOGGLE_INBOX_NEW_MESSAGE });

export const getUserRequests = userId => async dispatch => {
  dispatch({
    type: TOGGLE_REFRESH
  });
  const response = await fetchUserRequests(userId);
  dispatch({
    type: STORE_USER_REQUESTS,
    payload: response
  });
};
