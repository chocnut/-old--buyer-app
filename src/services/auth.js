import * as axios from "../utils/axios";

const signUpUrl = "/api/users";

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
            password
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
