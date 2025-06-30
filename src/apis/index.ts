import axios, { AxiosError, AxiosInstance } from 'axios';

const BASEURL = 'http://localhost:8880';

export const instance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API 요청 오류:', error.message);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error('API 요청 오류:', error.message);
    return Promise.reject(error);
  },
);
