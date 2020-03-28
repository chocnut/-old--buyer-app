import axios from "axios";

const instance = axios.create({
  baseURL: "https://suppliers.eewoo.io" //AppConfig.API_ENDPOINT_URL
});

export const getInstance = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  return instance;
};

export const getNewInstance = () => {
  return axios.create({
    baseURL: "https://suppliers.eewoo.io" //AppConfig.API_ENDPOINT_URL
  });
};

export const authorize = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const unauthorize = () => {
  instance.defaults.headers.common.Authorization = ``;
};
