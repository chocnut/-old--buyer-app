import * as axios from "../utils/axios";

const CLIENT_ID = "1";
const CLIENT_SECRET = "wM4kEanawYxVOVdRiVU9AF8fgOEJ03RyTlC0L2ev";
const signUpUrl = "/api/users";
const loginUrl = "/oauth/token";

import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "eewo_secure_token";

const setToken = async token => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const removeToken = async () => {
  return SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const logout = async () => await removeToken();

export const login = async ({ email, password }) => {
  try {
    const response = await axios.getNewInstance().post(
      loginUrl,
      {
        grant_type: "password",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: email,
        password,
        scope: "*"
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    setToken(response.data.access_token);
    return Promise.resolve(response);
  } catch (e) {
    if (!e.response) {
      throw { message: "Something went wrong" };
    }
  }
};

export const signUp = async ({ email, password, name }) => {
  try {
    const response = await axios.getNewInstance().post(
      signUpUrl,
      {
        data: {
          type: "users",
          attributes: {
            name,
            email,
            password,
            bio: "Sample Bio",
            location: "GB"
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
