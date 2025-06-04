import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileText,
  ThumbsUp,
  MessageCircle,
  Filter,
  PlusCircle,
} from "lucide-react";

// Mock community posts data
const mockPosts = [
  {
    id: 1,
    title: "미국 실리콘밸리 면접 후기 (소프트웨어 엔지니어)",
    content:
      "지난 달 미국 실리콘밸리 테크 기업의 온사이트 면접을 보고 왔습니다. 총 5개의 라운드로 이루어졌으며, 각 라운드별로 다른 문제들이 출제되었습니다...",
    author: "테크준비생",
    authorImage: null,
    date: "2025-03-15",
    likes: 42,
    comments: 18,
    tags: ["면접후기", "미국취업", "소프트웨어"],
    type: "experience",
  },
  {
    id: 2,
    title: "[포트폴리오 공유] 웹 개발자 취업 포트폴리오 - React/Node.js",
    content:
      "웹 개발자 취업을 위해 준비한 포트폴리오입니다. React와 Node.js로 제작한 프로젝트들이 포함되어 있으며, 실제 취업에 사용했던 자료입니다...",
    author: "웹개발자K",
    authorImage: null,
    date: "2025-03-10",
    likes: 35,
    comments: 9,
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
    authorImage: null,
    date: "2025-03-05",
    likes: 27,
    comments: 14,
    tags: ["취업후기", "일본취업", "비전공자"],
    type: "experience",
  },
  {
    id: 4,
    title: "[이력서/CV 공유] 영문 이력서 템플릿 모음",
    content:
      "해외 취업을 준비하시는 분들을 위해 영문 이력서 템플릿을 공유합니다. 분야별로 다양한 템플릿이 준비되어 있으니 참고하세요...",
    author: "글로벌커리어",
    authorImage: null,
    date: "2025-02-28",
    likes: 51,
    comments: 7,
    tags: ["이력서", "영문이력서", "템플릿"],
    type: "resource",
    attachment: {
      name: "english_cv_templates_2025.zip",
      size: "4.8MB",
    },
  },
  {
    id: 5,
    title: "싱가포르 금융권 면접 후기 및 준비 팁",
    content:
      "싱가포르 금융 기업 면접 경험과 준비 과정을 공유합니다. 현지 면접관들이 중요하게 생각하는 부분과 자주 물어보는 질문들을 정리했습니다...",
    author: "파이낸스프로",
    authorImage: null,
    date: "2025-02-20",
    likes: 33,
    comments: 21,
    tags: ["면접후기", "싱가포르취업", "금융권"],
    type: "experience",
  },
];

// 태그 옵션 목록
const tagOptions = [
  { value: "interview", label: "면접후기" },
  { value: "portfolio", label: "포트폴리오" },
  { value: "resume", label: "이력서" },
  { value: "experience", label: "취업경험" },
  { value: "tip", label: "취업팁" },
  { value: "usa", label: "미국취업" },
  { value: "japan", label: "일본취업" },
  { value: "singapore", label: "싱가포르취업" },
  { value: "europe", label: "유럽취업" },
  { value: "software", label: "소프트웨어" },
  { value: "finance", label: "금융" },
  { value: "manufacturing", label: "제조" },
  { value: "medical", label: "의료" },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  // 필터링된 게시물 목록
  const filteredPosts = mockPosts.filter((post) => {
    // 활성 탭 필터링
    if (activeTab !== "all" && post.type !== activeTab) return false;

    if (
      searchTerm &&
      !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    // 선택된 태그 필터링
    if (
      selectedTags.length > 0 &&
      !post.tags.some((tag) => selectedTags.includes(tag))
    )
      return false;

    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색어가 변경되면 필터링된 게시물 목록을 업데이트
    setSearchTerm(searchTerm.trim());
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleWritePost = () => {
    navigate("/community/write");
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">커뮤니티</h1>
          <p className="text-brand-gray-600 mb-8">
            경험과 자료를 공유하고 서로에게 도움을 주세요
          </p>

          {/* 컨트롤 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="experience">경험 공유</TabsTrigger>
                <TabsTrigger value="resource">자료 공유</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="ml-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
              <Button
                className="bg-brand-yellow hover:bg-brand-yellow-dark text-black"
                onClick={handleWritePost}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                글쓰기
              </Button>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-400" />
                <Input
                  type="text"
                  placeholder="제목, 내용, 작성자 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 pr-4 flex-1"
                />
              </div>
              <Button
                type="submit"
                className="h-12 bg-brand-yellow hover:bg-brand-yellow-dark text-black"
              >
                검색
              </Button>
            </form>

            {showFilters && (
              <div className="bg-white border border-brand-gray-200 rounded-lg p-4 mb-4 animate-fade-in">
                <h3 className="font-medium mb-3">태그 필터</h3>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag.value}
                      className={`py-1.5 px-3 text-sm rounded-full transition-all ${
                        selectedTags.includes(tag.label)
                          ? "bg-brand-yellow text-black font-medium"
                          : "bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200"
                      }`}
                      onClick={() => toggleTag(tag.label)}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 게시글 */}
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link
                  to={`/community/${post.id}`}
                  key={post.id}
                  className="block bg-white border border-brand-gray-200 rounded-xl p-6 hover:shadow-md transition-all hover-lift"
                >
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

                  <h3 className="text-xl font-bold mb-3 hover:text-brand-yellow transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-brand-gray-600 mb-4 line-clamp-2">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-brand-gray-100">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={post.authorImage || ""}
                          alt={post.author}
                        />
                        <AvatarFallback>
                          {post.author.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author}</span>
                      <span className="text-xs text-brand-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-brand-gray-500">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-brand-gray-500">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-brand-gray-200 rounded-lg">
                <Search className="mx-auto h-10 w-10 text-brand-gray-300 mb-3" />
                <p className="text-brand-gray-500 mb-2">검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
