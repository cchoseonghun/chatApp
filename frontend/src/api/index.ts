import axios, { AxiosResponse } from "axios";
import { User } from "../interfaces";

interface ILogin {
  status?: boolean;
  user?: User;
  msg?: string;
}

interface ISetAvatar {
  image: string;
  isSet: boolean;
}

export const host = "http://localhost:5000";

const API = axios.create({
  baseURL: host,
});

export const signUp = (FormData: {
  password: string;
  username: string;
  email: string;
}) => API.post("/api/auth/register", FormData);

export const login = (FormData: {
  password: string;
  username: string;
}): Promise<AxiosResponse<ILogin>> => API.post("/api/auth/login", FormData);

export const setProfileAvatar = (
  id: string,
  avatar: string
): Promise<AxiosResponse<ISetAvatar>> =>
  API.post(`/api/auth/setAvatar/${id}`, { image: avatar });

export const getAllUsers = (
  currentUserId: string
): Promise<AxiosResponse<User[]>> =>
  API.get(`/api/auth/allUsers/${currentUserId}`);

export const sendMessage = (
  from: string,
  to: string,
  message: string,
  image: string = ""
) => {
  API.post(`/api/messages/addMessage`, { from, to, message, image });
};

export const getAllMessages = (from: string, to: string) =>
  API.post(`api/messages/getMessages`, { from, to });
