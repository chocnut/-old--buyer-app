import { STORE_USER_REQUESTS, TOGGLE_REFRESH } from "./request.actionTypes";
import { fetchUserRequests } from "../../services/request";

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
