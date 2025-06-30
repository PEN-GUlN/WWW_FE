import Cookies from 'js-cookie';

export const cookie = {
  get: (key: string) => {
    return Cookies.get(key);
  },

  set: (key: string, value: string, options = {}) => {
    Cookies.set(key, value, options);
  },

  remove: (key: string, options = { path: '/' }) => {
    Cookies.remove(key, options);
  },
};
