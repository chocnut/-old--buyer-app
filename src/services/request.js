import * as axios from "../utils/axios";
import { getToken } from "../services/auth";

const requestsUrl = userId => `/api/users/${userId}/requests`;

export const fetchUserRequests = async userId => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).get(requestsUrl(userId));
    return Promise.resolve(response);
  } catch (e) {
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};
