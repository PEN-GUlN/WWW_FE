import { instance } from '..';
import { LoginRequestType, SignupRequestType } from './type';

const router = '/user';
const authRouter = '/auth';

export const signup = async (request: SignupRequestType) => {
  const response = await instance.post(`${authRouter}/signup`, request);
  return response.data;
};

export const login = async (request: LoginRequestType) => {
  const response = await instance.post(`${authRouter}/login`, request);
  return response.data;
};

export const logout = async () => {
  const response = await instance.post(`${authRouter}/logout`);
  return response.data;
};

export const getMyPage = async () => {
  const response = await instance.get(`${router}/mypage`);
  return response.data;
};
