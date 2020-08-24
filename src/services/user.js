import * as axios from "../utils/axios";
import { getToken } from "../services/auth";

const apiMeUrl = "/api/me";
const uploadUrl = "/api/users/uploadImage";

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

export const uploadAvatar = async ({ uri, name, type }) => {
  const uploadApiUrl = `https://suppliers.eewoo.io${uploadUrl}`;

  try {
    const token = await getToken();
    const formData = new FormData();
    formData.append("image", {
      uri,
      name,
      type
    });

    console.log(formData);

    const response = await fetch(uploadApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};
