import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import DOMPurify from 'dompurify';
import {
  MessageCircle,
  ArrowLeft,
  Send,
  // Download,
  Calendar,
  // Heart,
  // FileText,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostDetailType } from '@/apis/post/type';
import { getPostById } from '@/apis/post';
import { createComment } from '@/apis/comment';
import { Default } from '@/assets';
import CommentList from '@/components/ui/commentList';
import { useToast } from '@/hooks/use-toast';

const CommunityPostDetail = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // const [liked] = useState(false);

  const { data } = useQuery<PostDetailType>({
    queryKey: ['postDetail', id],
    queryFn: () => getPostById(Number(id)),
    enabled: !!id,
  });
  const post = data || null;
  console.log('게시글 데이터:', post);

  // 댓글 작성 mutation
  const createCommentMutation = useMutation({
    mutationFn: (content: string) =>
      createComment({ content, postId: Number(id) }),
    onSuccess: () => {
      toast({
        title: '댓글이 작성되었습니다.',
        description: '댓글이 성공적으로 등록되었습니다.',
      });
      setNewComment('');
      // 게시글 상세 데이터 새로고침 (댓글 포함)
      queryClient.invalidateQueries({ queryKey: ['postDetail', id] });
    },
    onError: (error) => {
      toast({
        title: '댓글 작성 실패',
        description: '댓글 작성 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
      console.error('댓글 작성 실패:', error);
    },
  });

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
    if (!newComment.trim()) {
      toast({
        title: '댓글 내용을 입력해주세요',
        description: '댓글 내용은 비워둘 수 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    createCommentMutation.mutate(newComment);
  };

  // const handleDownload = () => {
  //   if (post.attachment) {
  //     // 다운로드 로직 (예: 파일 다운로드 API 호출)
  //     alert(`${post.attachment.name} 다운로드 중...`);
  //   }
  // };

  // 유저네임을 이메일에서 추출하는 함수
  const getUsername = (email: string) => {
    return email.split('@')[0];
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
                  disabled={createCommentMutation.isPending}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {createCommentMutation.isPending ? '작성 중...' : '댓글 작성'}
                </Button>
              </div>
            </form>
            {/* 댓글 목록 */}
            <CommentList comments={post.comments} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
