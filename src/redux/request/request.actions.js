import { STORE_USER_REQUESTS } from "./request.actionTypes";
import { fetchUserRequests } from "../../services/request";

export const getUserRequests = userId => async dispatch => {
  const response = await fetchUserRequests(userId);
  dispatch({
    type: STORE_USER_REQUESTS,
    payload: response
  });
};
