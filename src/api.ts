import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { formatDate } from "./lib/utils";
import {
  IChatRoomList,
  ICreatePhotoVariables,
  ISignUpVariables,
  IUploadImageVariables,
  IUsernameLoginVariables,
} from "./types";
import { IUploadRoomForm } from "./types";
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
          "X-CSRFToken": Cookie.get("csrftoken") || "",
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
      `/users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
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

export const getAmenities = () =>
  axiosInstance.get("rooms/amenities").then((response) => response.data);

export const getCategories = () =>
  axiosInstance.get("categories").then((response) => response.data);

export const uploadRoom = (variables: IUploadRoomForm) =>
  axiosInstance
    .post(`rooms/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUploadURL = () =>
  axiosInstance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const createPhoto = ({
  description,
  file,
  roomPk,
}: ICreatePhotoVariables) =>
  axiosInstance
    .post(
      `rooms/${roomPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
type CheckBookingQueryKey = [string, string?, Date[]?];
export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = formatDate(firstDate);
    // const [checkOut] = secondDate.toJSON().split("T");
    const checkOut = formatDate(secondDate);
    return axiosInstance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};
type CheckChatRoomQueryKey = [string, number];
export const getChatRoomList = () => {
  return axiosInstance
    .get(`/direct_msgs/roomlist`)
    .then((response) => response.data);
};
