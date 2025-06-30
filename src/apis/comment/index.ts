import { instance } from '..';
import {
  CommentRequestType,
  CommentResponseType,
  CommentListResponse,
} from './type';

const router = '/comment';

export const createComment = async (
  data: CommentRequestType
): Promise<CommentResponseType> => {
  const response = await instance.post(`${router}/save`, data);
  return response.data;
};

export const getAllCommentByPost = async (
  postId: number
): Promise<CommentListResponse> => {
  const response = await instance.get(`${router}/${postId}`);
  return response.data;
};
