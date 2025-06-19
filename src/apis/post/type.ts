import { CommentResponse } from "../comment/type";

export interface PostDetailType {
  id: number;
  title: string;
  content: string;
  type: PostTypeEnum;
  created_at: string;
  tags: string[];
  user: {
    email: string;
  };
  comments: CommentResponse[];
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  type: PostTypeEnum;
  created_at: string;
  tags: string[];
  user: {
    email: string;
  };
}

export interface PostListType {
  posts: PostType[];
  postCnt: number;
}

export interface PostRequestType {
  title: string;
  content: string;
  type: PostTypeEnum;
  tags: string[];
}

export enum PostTypeEnum {
  EXPERIENCE = "경험",
  FILE = "자료",
}
