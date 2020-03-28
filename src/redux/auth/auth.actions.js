import { signUp, login } from "../../services/auth";

export const signupUser = async ({ email, password, name }) => {
  const result = await signUp({ email, password, name });
  return result;
};

export const loginUser = async ({ email, password }) => {
  const result = await login({ email, password });
  return result;
};
