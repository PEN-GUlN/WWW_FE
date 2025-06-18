import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Filter, PlusCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PostListType } from '@/apis/post/type';
import { getAllPostList } from '@/apis/post';

// 태그 옵션 목록
const tagOptions = [
  { value: 'interview', label: '면접후기' },
  { value: 'portfolio', label: '포트폴리오' },
  { value: 'resume', label: '이력서' },
  { value: 'experience', label: '취업경험' },
  { value: 'tip', label: '취업팁' },
  { value: 'usa', label: '미국취업' },
  { value: 'japan', label: '일본취업' },
  { value: 'singapore', label: '싱가포르취업' },
  { value: 'europe', label: '유럽취업' },
  { value: 'software', label: '소프트웨어' },
  { value: 'finance', label: '금융' },
  { value: 'manufacturing', label: '제조' },
  { value: 'medical', label: '의료' },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const { data } = useQuery<PostListType>({
    queryKey: ['post'],
    queryFn: getAllPostList,
  });

  const getUsername = (email: string) => {
    return email.split('@')[0];
  };

  // 필터링된 게시물 목록
  const filteredPosts = data?.posts.filter((post) => {
    // 활성 탭 필터링
    if (activeTab !== 'all' && post.type !== activeTab) return false;

    if (
      searchTerm &&
      !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    // 선택된 태그 필터링
    if (selectedTags.length > 0 && !post.tags.some((tag) => selectedTags.includes(tag)))
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
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleWritePost = () => {
    navigate('/community/write');
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">커뮤니티</h1>
          <p className="text-brand-gray-600 mb-8">경험과 자료를 공유하고 서로에게 도움을 주세요</p>

          {/* 컨트롤 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
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
                          ? 'bg-brand-yellow text-black font-medium'
                          : 'bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200'
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
            {(filteredPosts?.length ?? 0) > 0 ? (
              (filteredPosts ?? []).map((post) => (
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
                    {/* {post.type === PostTypeEnum.FILE && // post.file && ( v파일 업로드시 로직 추가할것
                      <Badge
                        variant="outline"
                        className="ml-auto flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        {post.file.name.split(".").pop()}
                      </Badge>
                    )} */}
                  </div>

                  <h3 className="text-xl font-bold mb-3 hover:text-brand-yellow transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-brand-gray-600 mb-4 line-clamp-2">{post.content}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-brand-gray-100">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={''} alt={getUsername(post.user.email)} />
                        <AvatarFallback>
                          {getUsername(post.user.email).substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{getUsername(post.user.email)}</span>
                      <span className="text-xs text-brand-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* <div className="flex items-center gap-1 text-brand-gray-500">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div> */}
                      <div className="flex items-center gap-1 text-brand-gray-500">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments.length}</span>
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
