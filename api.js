import axios from "axios";
import env from "./env";
import Base64 from "./utils/Base64";
import moment from "moment";

const headers = {
  "Content-Type": "application/vnd.api+json",
  Accept: "application/vnd.api+json"
};

let user_id;
let user = {};
const api = {};

api.setCredentials = (id, auth_token) => {
  user_id = id;
  headers.Authorization = `Bearer ${auth_token}`;
};

api.login = (username, password) => {
  const data = {
    grant_type: "password",
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET,
    scope: "*",
    username,
    password
  };

  return axios({
    url: `${env.API_URL}/oauth/token`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    data
  }).then(res => {
    const token = res.data.access_token;

    // part of the token is user data in the format of a JS object which is base64 encoded as a string
    const base64_encoded_string = token.split(".")[1];
    const decoded_string = Base64.atob(base64_encoded_string);
    const user_object = JSON.parse(decoded_string);
    const token_expires = moment(user_object.exp * 1000);

    api.setCredentials(user_object.sub, token);

    return { token, user_id, token_expires };
  });
};

api.resetPassword = email => {
  const data = {
    email,
    url: "https://app.eewoo.io/reset-password"
  };

  return axios({
    url: `${env.API_URL}/api/users/password-reset`,
    method: "post",
    headers,
    data
  }).then(res => res.data);
};

api.getUser = (user_id, auth_token) => {
  api.setCredentials(user_id, auth_token);

  return axios({
    url: `${env.API_URL}/api/users/${user_id}`,
    method: "get",
    headers
  }).then(res => {
    user = {
      name: res.data.data.attributes.name,
      email: res.data.data.attributes.email
    };
    return res.data;
  });
};

api.createUser = attributes => {
  return axios({
    url: `${env.API_URL}/api/users`,
    method: "post",
    headers,
    data: {
      data: {
        type: "users",
        attributes
      }
    }
  }).then(res => res.data);
};

api.getRequests = () => {
  return axios({
    url: `${env.API_URL}/api/users/${user_id}/requests`,
    method: "get",
    headers
  }).then(res => res.data);
};

api.getRequest = id => {
  return axios({
    url: `${env.API_URL}/api/requests/${id}`,
    method: "get",
    headers
  }).then(res => res.data);
};

api.deleteRequest = id => {
  return axios({
    url: `${env.API_URL}/api/requests/${id}`,
    method: "delete",
    headers
  }).then(res => res.data);
};

api.saveRequest = attributes => {
  return axios({
    url: `${env.API_URL}/api/requests`,
    method: "post",
    headers,
    data: {
      data: {
        type: "requests",
        attributes
      }
    }
  }).then(res => {
    return res.data;
  });
};

api.updateRequest = (id, attributes) => {
  return axios({
    url: `${env.API_URL}/api/requests/${id}`,
    method: "patch",
    headers,
    data: {
      data: {
        type: "requests",
        id,
        attributes
      }
    }
  }).then(res => {
    return res.data;
  });
};

api.sendRequest = id => {
  return axios({
    url: `${env.API_URL}/api/requests/${id}/send`,
    method: "post",
    headers,
    data: {}
  }).then(res => {
    return res.data;
  });
};

api.getMediaLinks = id => {
  return axios({
    url: `${env.API_URL}/api/requests/${id}/media`,
    method: "get",
    headers
  }).then(res => res.data);
};

api.getUserMedia = () => {
  return axios({
    url: `${env.API_URL}/api/users/${user_id}/media`,
    method: "get",
    headers
  }).then(res => res.data);
};

api.createMedia = attributes => {
  return axios({
    url: `${env.API_URL}/api/media`,
    method: "post",
    headers,
    data: {
      data: {
        type: "media",
        attributes
      }
    }
  }).then(res => res.data);
};

api.deleteMedia = id => {
  return axios({
    url: `${env.API_URL}/api/media/${id}`,
    method: "delete",
    headers
  }).then(res => res.data);
};

api.postToSlack = (message, type, userData) => {
  userData = userData || user;
  const payload = {
    username: "Eewoo app",
    icon_url: "https://jonhewines.co.uk/icon.png",
    attachments: [
      {
        fallback: `New message from the eewoo app`,
        pretext: "New message from the eewoo app",
        color: "#F03758",
        fields: [
          {
            title: type,
            value: message,
            short: false
          },
          {
            title: "User email",
            value: userData.email,
            short: true
          },
          {
            title: "User name",
            value: userData.name,
            short: true
          }
        ]
      }
    ]
  };

  const channels = {
    Error:
      "https://hooks.slack.com/services/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",
    Signup:
      "https://hooks.slack.com/services/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"
  };

  return axios({
    url: channels[type],
    method: "post",
    data: JSON.stringify(payload)
  }).then(res => res.data);
};

export default api;
