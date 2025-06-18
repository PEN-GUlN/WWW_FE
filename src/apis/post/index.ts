import { instance } from '..';
import { PostListType, PostType } from './type';

const router = '/post';

export const getAllPostList = async (): Promise<PostListType> => {
  const response = await instance.get(`${router}/query/all`);
  return response.data;
};

export const getPostListByType = async (type: PostType): Promise<PostListType> => {
  const response = await instance.get(`${router}/query/${type}`);
  return response.data;
};

export const getPostListById = async (id: number): Promise<PostType> => {
  const response = await instance.get(`${router}/query/detail/${id}`);
  return response.data;
};
