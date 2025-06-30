import { instance } from '..';
import { BookmarkRequestType } from './type';

const router = '/bookmark';

export const setBookmark = async (data: BookmarkRequestType) => {
  const response = await instance.post(`${router}/status`, data);
  return response.data;
};
