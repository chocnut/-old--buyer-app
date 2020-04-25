import * as axios from "../utils/axios";
import { getToken } from "../services/auth";

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

export const fetchMedias = async url => {
  try {
    const token = await getToken();
    const response = await axios.getInstance(token).get(url);
    const { data } = response.data;
    if (data.length > 0) {
      return Promise.resolve(data[0].attributes.file_uri);
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
