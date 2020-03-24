import { signUp } from "../../services/auth";

export const signupUser = async ({ email, password, name }) => {
  const result = await signUp({ email, password, name });
  return result;
};
