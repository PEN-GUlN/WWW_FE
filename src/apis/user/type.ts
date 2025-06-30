import { BookmarkListResponseType } from '../bookmark/type';
import { PostListType } from '../post/type';

export enum Interest {
  'DEVELOPMENT' = '개발',
  'ELECTRICAL_ELECTRONIC' = '전기/전자',
  'MANUFACTURING' = '생산/제조',
  'CHEMICAL' = '화학',
  'TEXTILE_APPAREL' = '섬유/의류',
  'MECHANICAL_METAL' = '기계/금속',
  'CONSTRUCTION' = '건설/토목',
  'OFFICE' = '사무/서비스',
  'MEDICAL' = '의료',
  'OTHER' = '기타',
}

export enum Type {
  'EXPERIENCE' = '경험',
  'FILE' = '자료',
}

export interface SignupRequestType {
  email: string;
  password: string;
  interest: Interest[];
}

export interface LoginRequestType {
  email: string;
  password: string;
}

export interface myPageType {
  email: string;
  interest: Interest;
  posts: PostListType;
  bookmarkedPosts: BookmarkListResponseType;
}
