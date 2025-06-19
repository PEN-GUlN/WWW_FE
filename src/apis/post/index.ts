import { instance } from "..";
import { PostDetailType, PostListType, PostType } from "./type";

const router = "/post";

export const getAllPostList = async (): Promise<PostListType> => {
  const response = await instance.get(`${router}/query/all`);
  return response.data;
};

export const getPostListByType = async (
  type: PostType
): Promise<PostListType> => {
  const response = await instance.get(`${router}/query/${type}`);
  return response.data;
};

export const getPostById = async (id: number): Promise<PostDetailType> => {
  const response = await instance.get(`${router}/query/detail/${id}`);
  return response.data;
};
