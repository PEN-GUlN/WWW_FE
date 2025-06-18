export interface CommentResponse {
  id: number;
  content: string;
  created_at: Date;
  user: {
    email: string;
  };
}

export interface CommentRequest {
  content: string;
  postId: number;
}

// export interface CommentResponse {
//   comments: CommentResponse[];
//   commentCnt: number;
// }
