import { signUp, login } from "../../services/auth";
import jwtDecode from "jwt-decode";

export const signupUser = async ({ email, password, name }) => {
  try {
    const result = await signUp({ email, password, name });
    return result;
  } catch (e) {
    return Promise.reject(result);
  }
};

export const loginUser = async ({ email, password }) => {
  const result = await login({ email, password });
  if (result) {
    const { access_token: token } = result.data;
    const { aud } = jwtDecode(token);
    return aud;
  }
  return result;
};
