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

export enum PostTagEnum {
  INTERVIEW = "면접후기",
  PORTFOLIO = "포트폴리오",
  RESUME = "이력서",
  EXPERIENCE = "취업경험",
  TIP = "취업팁",
}

export enum LocationTagEnum {
  USA = "미국취업",
  JAPAN = "일본취업",
  SINGAPORE = "싱가포르취업",
  EUROPE = "유럽취업",
}

export enum IndustryTagEnum {
  SOFTWARE = "소프트웨어",
  FINANCE = "금융",
  MANUFACTURING = "제조",
  MEDICAL = "의료",
}
