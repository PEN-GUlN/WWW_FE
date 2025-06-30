export interface CommentResponseType {
  id: number;
  content: string;
  created_at: Date;
  user: {
    email: string;
  };
}

export interface CommentRequestType {
  content: string;
  postId: number;
}

export interface CommentListResponse {
  comments: CommentResponseType[];
  commentCnt: number;
}
