import * as axios from "../utils/axios";
import { getToken } from "../services/auth";

const apiMeUrl = "api/me";

export const getUser = async () => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).get(apiMeUrl);
    return Promise.resolve(response);
  } catch (e) {
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};
