import axios from "axios";

const instance = axios.create({
  baseURL: "http://api-supplier.test" //AppConfig.API_ENDPOINT_URL
});

export const getInstance = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  return instance;
};

export const getNewInstance = () => {
  return axios.create({
    // baseURL: "https://suppliers.eewoo.io" //AppConfig.API_ENDPOINT_URL
    baseURL: "http://api-supplier.test"
  });
};

export const authorize = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const unauthorize = () => {
  instance.defaults.headers.common.Authorization = ``;
};
