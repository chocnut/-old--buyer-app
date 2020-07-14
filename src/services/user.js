import * as axios from "../utils/axios";
import { getToken } from "../services/auth";

const apiMeUrl = "api/me";
const uploadUrl = "/api/user/imageUpload";

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

export const uploadAvatar = async file => {
  try {
    const token = await getToken();
    // const response = await axios.getInstance(token).post(
    //   uploadUrl,
    //   {
    //     image: file
    //   },
    //   {
    //     headers: { "Content-Type": "application/vnd.api+json" }
    //   }
    // );

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(uploadApiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        body: formData
      });
      return response.json();
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }

    return Promise.resolve(response);
  } catch (e) {
    console.log(e);
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};
