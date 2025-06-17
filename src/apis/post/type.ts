import { Type } from "../user/type";

export interface PostType {
  id: number;
  title: string;
  content: string;
  type: Type;
  created_at: string;
  user: {
    mail: string;
  };
}
export interface PostListType {
  posts: PostType[];
  postCnt: number;
}

export interface PostRequestType {
  title: string;
  content: string;
  type: Type;
}
