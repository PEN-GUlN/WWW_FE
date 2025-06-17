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
  Download,
  Calendar,
  Heart,
  FileText,
} from "lucide-react";

const mockPosts = [
  {
    id: 1,
    title: "미국 실리콘밸리 면접 후기 (소프트웨어 엔지니어)",
    content:
      "지난 달 미국 실리콘밸리 테크 기업의 온사이트 면접을 보고 왔습니다. 총 5개의 라운드로 이루어졌으며, 각 라운드별로 다른 문제들이 출제되었습니다...<br><br>첫 번째 라운드에서는 알고리즘 문제가 출제되었고, 시간 복잡도와 공간 복잡도를 고려한 솔루션을 제시해야 했습니다. 특히 해시맵과 트리 구조에 대한 이해도를 중점적으로 확인하는 문제였습니다.<br><br>두 번째 라운드는 시스템 디자인 인터뷰로, 대용량 트래픽을 처리할 수 있는 분산 시스템을 설계하는 문제가 출제되었습니다. 데이터 일관성과 확장성에 대한 접근 방식을 중점적으로 물어보았습니다.<br><br>세 번째 라운드는 행동 인터뷰로, 과거 프로젝트 경험과 팀 협업 경험에 대해 자세히 질문받았습니다. STAR 방식으로 답변을 준비하는 것이 도움이 되었습니다.<br><br>네 번째와 다섯 번째 라운드는 각각 프로덕트 매니저와 엔지니어링 매니저와의 인터뷰로, 기술적 의사결정 과정과 프로덕트에 대한 이해도를 평가받았습니다.<br><br>전반적으로 기술적인 깊이보다는 문제 해결 접근 방식과 커뮤니케이션 스킬을 중요하게 평가하는 인상을 받았습니다. 준비하시는 분들께 도움이 되길 바랍니다.",
    author: "테크준비생",
    authorEmail: "tech_student@gmail.com",
    authorImage: null,
    date: "2025-03-15",
    likes: 42,
    comments: [
      {
        id: 1,
        author: "개발왕",
        authorEmail: "devking@gmail.com",
        content:
          "정말 상세한 후기 감사합니다! 시스템 디자인 인터뷰는 어떤 식으로 준비하셨나요?",
        date: "2025-03-15",
        authorImage: null,
      },
      {
        id: 2,
        author: "실리콘밸리드림",
        authorEmail: "siliconvalleydream@gmail.com",
        content:
          "미국 기업은 역시 시스템 디자인과 알고리즘을 중요시하는군요. 인터뷰 후 피드백도 받으셨나요?",
        date: "2025-03-16",
        authorImage: null,
      },
    ],
    tags: ["면접후기", "미국취업", "소프트웨어"],
    type: "experience",
  },
  {
    id: 2,
    title: "[포트폴리오 공유] 웹 개발자 취업 포트폴리오 - React/Node.js",
    content:
      "웹 개발자 취업을 위해 준비한 포트폴리오입니다. React와 Node.js로 제작한 프로젝트들이 포함되어 있으며, 실제 취업에 사용했던 자료입니다...<br><br>포트폴리오는 총 5개의 프로젝트로 구성되어 있습니다:<br><br>1. 실시간 채팅 애플리케이션 (React, Socket.io, Node.js)<br>2. 전자상거래 플랫폼 (React, Redux, Express, MongoDB)<br>3. 소셜 미디어 대시보드 (React, GraphQL, Apollo)<br>4. 실시간 데이터 시각화 도구 (D3.js, React, Express)<br>5. 개인 블로그 (Next.js, Contentful CMS)<br><br>각 프로젝트는 깃허브에 공개되어 있으며, 라이브 데모 링크도 포함하고 있습니다. README에는 기술 스택, 주요 기능, 개발 과정에서의 도전과제와 해결책을 자세히 기술했습니다.<br><br>포트폴리오를 준비하면서 가장 중요하게 생각한 점은 단순히 기술을 나열하는 것이 아니라, 각 프로젝트를 통해 어떤 문제를 해결했는지, 어떤 가치를 창출했는지를 보여주는 것이었습니다.<br><br>첨부된 PDF에는 각 프로젝트의 스크린샷과 코드 하이라이트, 그리고 개발 과정에서의 의사결정에 대한 설명이 포함되어 있습니다. 취업 준비하시는 분들께 도움이 되길 바랍니다.",
    author: "웹개발자K",
    authorEmail: "webdevk@gmail.com",
    authorImage: null,
    date: "2025-03-10",
    likes: 35,
    comments: [
      {
        id: 3,
        author: "신입개발자",
        authorEmail: "newbie_dev@gmail.com",
        content:
          "정말 훌륭한 포트폴리오네요! 실시간 채팅 애플리케이션 아키텍처에 대해 더 자세히 알 수 있을까요?",
        date: "2025-03-10",
        authorImage: null,
      },
    ],
    tags: ["포트폴리오", "웹개발", "React"],
    type: "resource",
    attachment: {
      name: "frontend_portfolio_2025.pdf",
      size: "2.4MB",
    },
  },
  {
    id: 3,
    title: "일본 도쿄 스타트업 취업 경험담 (비전공자 시점)",
    content:
      "대학에서 경영학을 전공하고 일본 IT 스타트업에 취업한 경험을 공유합니다. 비전공자로서 어떻게 준비했는지, 어떤 과정을 거쳤는지 자세히 설명드릴게요...",
    author: "일본취업러",
    authorEmail: "japan_jobber@gmail.com",
    authorImage: null,
    date: "2025-03-05",
    likes: 27,
    comments: [],
    tags: ["취업후기", "일본취업", "비전공자"],
    type: "experience",
  },
];

const CommunityPostDetail = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);

  const post = mockPosts.find((post) => post.id === Number(id));

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

  const handleLike = () => {
    setLiked(!liked);
    // 좋아요를 백엔드로 전송하는 로직
  };

  const handleDownload = () => {
    if (post.attachment) {
      // 다운로드 로직 (예: 파일 다운로드 API 호출)
      alert(`${post.attachment.name} 다운로드 중...`);
    }
  };

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
              {post.type === "resource" && post.attachment && (
                <Badge
                  variant="outline"
                  className="ml-auto flex items-center gap-1"
                >
                  <FileText className="h-3 w-3" />
                  {post.attachment.name.split(".").pop()}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center justify-between border-b border-brand-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.authorImage || ""} alt={post.author} />
                  <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">
                    {getUsername(post.authorEmail)}
                  </div>
                  <div className="text-sm text-brand-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 ${
                    liked ? "text-red-500" : ""
                  }`}
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                  <span>{liked ? post.likes + 1 : post.likes}</span>
                </Button>

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

          {/* 첨부파일 다운로드 (존재하는 경우) */}
          {post.attachment && (
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
          )}

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
                          <AvatarImage
                            src={comment.authorImage || ""}
                            alt={comment.author}
                          />
                          <AvatarFallback>
                            {comment.author.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">
                              {getUsername(comment.authorEmail)}
                            </div>
                            <div className="text-xs text-brand-gray-500">
                              {new Date(comment.date).toLocaleDateString()}
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
