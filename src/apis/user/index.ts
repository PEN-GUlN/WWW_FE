import { instance } from "..";
import { LoginRequestType, SignupRequestType } from "./type";

const router = "/user";

export const signup = async (request: SignupRequestType) => {
  const response = await instance.post(`${router}/signup`, request);
  return response.data;
};

export const login = async (request: LoginRequestType) => {
  const response = await instance.post(`${router}/login`, request);
  return response.data;
};

export const logout = async () => {
  const response = await instance.post(`${router}/logout`);
  return response.data;
};
