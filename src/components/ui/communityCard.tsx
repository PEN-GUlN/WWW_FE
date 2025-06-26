import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostType } from "@/apis/post/type";
import { Default } from "@/assets";
import { MessageCircle } from "lucide-react";

interface CommunityCardProps {
  post: PostType;
  commentCount: number;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  post,
  commentCount,
}) => {
  const navigate = useNavigate();
  const getUsername = (email: string) => email.split("@")[0];

  return (
    <div
      onClick={() => navigate(`/community/${post.id}`)}
      className="cursor-pointer block bg-white border border-brand-gray-200 rounded-xl p-6 hover:shadow-md transition-all hover-lift relative"
    >
      {/* 댓글 수 표시 - 우측 상단 */}
      <div className="absolute top-4 right-4 flex items-center gap-1 text-brand-gray-500 text-sm">
        <MessageCircle className="h-4 w-4" />
        <span>{commentCount}</span>
      </div>

      {/* 태그 목록 */}
      <div className="flex gap-2 mb-3">
        {post.tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-brand-gray-100 text-brand-gray-700"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* 제목 */}
      <h3 className="text-xl font-bold mb-3 hover:text-brand-yellow transition-colors">
        {post.title}
      </h3>

      {/* 내용 (최대 2줄로 제한) */}
      <p className="text-brand-gray-600 mb-4 line-clamp-2">{post.content}</p>

      {/* 작성자 정보 및 작성일 */}
      <div className="flex items-center justify-between pt-3 border-t border-brand-gray-100">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={Default} alt={getUsername(post.user.email)} />
            <AvatarFallback>
              {getUsername(post.user.email).substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">
            {getUsername(post.user.email)}
          </span>
          <span className="text-xs text-brand-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
