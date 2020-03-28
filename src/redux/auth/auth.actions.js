import { signUp, login } from "../../services/auth";
import jwtDecode from "jwt-decode";

export const signupUser = async ({ email, password, name }) => {
  const result = await signUp({ email, password, name });
  return result;
};

export const loginUser = async ({ email, password }) => {
  const result = await login({ email, password });
  const { access_token: token } = result.data;
  const { aud } = jwtDecode(token);

  return aud;
};
