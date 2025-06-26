import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CommentResponseType } from "@/apis/comment/type";
import { Default } from "@/assets";

interface CommentListProps {
  comments: CommentResponseType[];
}

const getUsername = (email: string) => email.split("@")[0];

const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="py-8">
        <div className="text-center text-brand-gray-500">
          아직 댓글이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex items-start gap-3 py-3 border-b border-brand-gray-100 last:border-b-0"
        >
          {/* 프로필 이미지 */}
          <Avatar className="h-8 w-8 flex-shrink-0 mt-0.5">
            <AvatarImage src={Default} alt={comment.user.email} />
            <AvatarFallback className="text-xs">
              {getUsername(comment.user.email).substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          {/* 댓글 내용 영역 */}
          <div className="flex-1 min-w-0">
            {/* 작성자 정보와 날짜 */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-brand-gray-900">
                {getUsername(comment.user.email)}
              </span>
              <span className="text-xs text-brand-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* 댓글 내용 */}
            <p className="text-sm text-brand-gray-800 leading-relaxed mb-2">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
