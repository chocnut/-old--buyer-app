import * as axios from "../utils/axios";
import { getToken } from "../services/auth";

const getUserUrl = userId => `api/users/${userId}`;

export const getUserById = async userId => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).get(getUserUrl(userId));
    return Promise.resolve(response);
  } catch (e) {
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};
