import axios from "axios";

const instance = axios.create({
  baseURL: "https://eewoo.wearefx.uk" //AppConfig.API_ENDPOINT_URL
});

export const getInstance = token => {
  if (token) {
    instance.defaults.headers.common.Authorization = `JWT ${token}`;
  }
  return instance;
};

export const getNewInstance = () => {
  return axios.create({
    baseURL: "https://eewoo.wearefx.uk" //AppConfig.API_ENDPOINT_URL
  });
};

export const authorize = token => {
  instance.defaults.headers.common.Authorization = `JWT ${token}`;
};

export const unauthorize = () => {
  instance.defaults.headers.common.Authorization = ``;
};
