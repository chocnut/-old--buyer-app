import * as axios from "../utils/axios";
import { getToken } from "../services/auth";
import { Platform } from "react-native";

const requestsUrl = userId => `/api/users/${userId}/requests`;
const createRequestUrl = "/api/requests";
const mediaUrl = "/api/media";

export const fetchUserRequests = async userId => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).get(requestsUrl(userId));
    return Promise.resolve(response.data.data);
  } catch (e) {
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};

export const fetchMedias = async (url, all = false) => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).get(url);
    const { data } = response.data;
    if (data.length > 0) {
      if (!all) {
        return Promise.resolve(data[0].attributes.file_uri);
      } else {
        return Promise.resolve(data);
      }
    }
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    if (!e.response) {
      throw { message: "Media Something went wrong" };
    }
  }
};

export const createRequest = async formData => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).post(
      createRequestUrl,
      {
        data: {
          type: "requests",
          attributes: formData
        }
      },
      {
        headers: { "Content-Type": "application/vnd.api+json" }
      }
    );

    return Promise.resolve(response);
  } catch (e) {
    console.log(e);
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};

export const uploadRequestPhotos = async ({ file, requestId }) => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).post(
      mediaUrl,
      {
        data: {
          type: "media",
          attributes: {
            request_id: requestId,
            file
          }
        }
      },
      {
        headers: { "Content-Type": "application/vnd.api+json" }
      }
    );

    return Promise.resolve(response);
  } catch (e) {
    console.log(e);
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};

export const messageFileUpload = async ({ uri, name, type }, threadId) => {
  const uploadApiUrl = `https://suppliers.eewoo.io/api/thread/${threadId}/uploadAttachment`;
  const token = await getToken();

  const formData = new FormData();
  formData.append("attachment", {
    uri,
    name,
    type
  });

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
};

export const fetchRequestThread = async requestId => {
  try {
    const token = await getToken();
    const url = `/api/requests/${requestId}/threads`;
    const response = await axios.getInstance(token).get(url);
    const { threads } = response.data;
    return threads;
  } catch (e) {
    console.log(e);
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};
