import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { ISignUpVariables, IUsernameLoginVariables } from "../types";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  axiosInstance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return axiosInstance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return axiosInstance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};
export const logOut = () =>
  axiosInstance.post(`users/log-out`, null, {
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
  });
// const BASE_URL = "http://127.0.0.1:8000/api/v1/";
// export async function getRooms() {
//   const response = await fetch(`${BASE_URL}rooms/`);
//   const json = await response.json();
//   return json;
// }
// const BASE_URL = "http://127.0.0.1:8000/api/v1/";

// export async function getRooms() {
//   const response = await axiosInstance.get(`rooms/`);
//   return response.data;
// }

export const getMe = () =>
  axiosInstance.get("users/me").then((response) => response.data);

export const githubLogin = (code: string) =>
  axiosInstance
    .post(
      "users/github",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrfToken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  axiosInstance
    .post(
      "users/kakao",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrfToken") || "",
        },
      }
    )
    .then((response) => response.status);

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  axiosInstance
    .post(
      "users/log-in",
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrfToken") || "",
        },
      }
    )
    .then((response) => response.data);

export const SignUp = ({
  username,
  password,
  email,
  name,
}: // currency,
// gender,
// language,
ISignUpVariables) =>
  axiosInstance
    .post(
      `users/`,
      // { username, password, email, name, currency, gender, language },
      { username, password, email, name },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
