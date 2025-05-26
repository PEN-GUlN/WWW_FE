import axios, { AxiosError, AxiosInstance } from "axios";

const BASEURL = "http://localhost:8880";

export const authInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

const getSessionIdFromCookies = (): string | undefined => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    return cookies["connect.sid"];
  }
  return undefined;
};

export const instance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const sessionId = getSessionIdFromCookies();
    if (sessionId) {
      config.headers["Cookie"] = `connect.sid=${sessionId}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("API 요청 오류:", error.message);
    return Promise.reject(error);
  }
);
