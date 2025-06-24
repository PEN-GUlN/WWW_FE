import { instance } from "..";
import {
  PostDetailType,
  PostListType,
  PostRequestType,
  PostType,
  PostTypeEnum,
} from "./type";

const router = "/post";

export const createPost = async (data: PostRequestType): Promise<PostType> => {
  const response = await instance.post(`${router}/save`, data);
  return response.data;
};

export const getAllPostList = async (): Promise<PostListType> => {
  const response = await instance.get(`${router}/query/all`);
  return response.data;
};

export const getPostListByType = async (
  type: PostTypeEnum
): Promise<PostListType> => {
  const response = await instance.get(`${router}/query/${type}`);
  return response.data;
};

export const getPostById = async (id: number): Promise<PostDetailType> => {
  const response = await instance.get(`${router}/query/detail/${id}`);
  return response.data;
};
