import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import DOMPurify from "dompurify";
import {
  MessageCircle,
  ArrowLeft,
  Send,
  // Download,
  Calendar,
  // Heart,
  // FileText,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PostDetailType } from "@/apis/post/type";
import { getPostById } from "@/apis/post";
import { Default } from "@/assets";

const CommunityPostDetail = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  // const [liked] = useState(false);

  const { data } = useQuery<PostDetailType>({
    queryKey: ["postDetail", id],
    queryFn: () => getPostById(Number(id)),
    enabled: !!id,
  });
  const post = data || null;

  if (!post) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              게시글을 찾을 수 없습니다
            </h1>
            <Link to="/community">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                커뮤니티로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // 댓글을 백엔드로 전송하는 로직
    alert("댓글 기능은 현재 준비 중입니다.");
    setNewComment("");
  };

  // const handleDownload = () => {
  //   if (post.attachment) {
  //     // 다운로드 로직 (예: 파일 다운로드 API 호출)
  //     alert(`${post.attachment.name} 다운로드 중...`);
  //   }
  // };

  // 유저네임을 이메일에서 추출하는 함수
  const getUsername = (email: string) => {
    return email.split("@")[0];
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 뒤로가기 버튼 */}
          <div className="mb-8">
            <Link to="/community">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                커뮤니티로 돌아가기
              </Button>
            </Link>
          </div>
          {/* 게시글 태그 */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-brand-gray-100 text-brand-gray-700"
                >
                  {tag}
                </Badge>
              ))}
              {/* {post.type === PostTypeEnum.FILE && post.attachment && ( 파일 업로드 이후 구현
                <Badge
                  variant="outline"
                  className="ml-auto flex items-center gap-1"
                >
                  <FileText className="h-3 w-3" />
                  {post.attachment.name.split(".").pop()}
                </Badge>
              )} */}
            </div>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center justify-between border-b border-brand-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={Default} alt={post.user.email} />
                  <AvatarFallback>
                    {post.user.email.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">
                    {getUsername(post.user.email)}
                  </div>
                  <div className="text-sm text-brand-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* <Button 좋아요 수는 추후 구현 예정
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 ${
                    liked ? "text-red-500" : ""
                  }`}
                  // onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                  <span>{liked ? post.likes + 1 : post.likes}</span>
                </Button> */}

                <div className="flex items-center gap-1 text-brand-gray-500">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
          {/* 게시글 내용 */}
          <div className="prose max-w-none mb-8">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
          </div>
          {/* 첨부파일 다운로드 (존재하는 경우) 이것도 미래의 내가*/}
          {/* {post.attachment && (
            <div className="bg-brand-gray-50 rounded-lg p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-gray-200 h-12 w-12 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-brand-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{post.attachment.name}</div>
                  <div className="text-sm text-brand-gray-500">
                    {post.attachment.size}
                  </div>
                </div>
              </div>
              <Button
                onClick={handleDownload}
                className="bg-brand-yellow hover:bg-brand-yellow-dark text-black"
              >
                <Download className="h-4 w-4 mr-2" />
                다운로드
              </Button>
            </div>
          )} */}
          {/* 댓글 섹션 */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">
              댓글 {post.comments.length}개
            </h2>

            {/* 댓글 작성 폼 */}
            <form onSubmit={handleSubmitComment} className="mb-8">
              <Textarea
                placeholder="댓글을 작성해주세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3 h-24"
                required
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-brand-yellow hover:bg-brand-yellow-dark text-black"
                >
                  <Send className="h-4 w-4 mr-2" />
                  댓글 작성
                </Button>
              </div>
            </form>

            {/* 댓글 목록 */}
            {post.comments.length > 0 ? (
              <div className="space-y-6">
                {post.comments.map((comment) => (
                  <Card key={comment.id} className="border-brand-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="" alt={comment.user.email} />
                          <AvatarFallback>
                            {comment.user.email.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">
                              {getUsername(comment.user.email)}
                            </div>
                            <div className="text-xs text-brand-gray-500">
                              {new Date(
                                comment.created_at
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-brand-gray-800">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-brand-gray-200 rounded-lg">
                <MessageCircle className="mx-auto h-10 w-10 text-brand-gray-300 mb-3" />
                <p className="text-brand-gray-500">아직 댓글이 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
