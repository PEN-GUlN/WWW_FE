import { useEffect, useState } from 'react';
import { PostListType, PostTypeEnum, PostType } from '@/apis/post/type';
import { getAllPostList, getPostListByType } from '@/apis/post';
import CommunityCard from './communityCard';
import { Search, Tag } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

const CommunityList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedType, setSelectedType] = useState<'전체' | PostTypeEnum>(
    '전체'
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<'text' | 'tag'>('text');

  const navigate = useNavigate();

  const fetchPosts = async (type: '전체' | PostTypeEnum) => {
    setLoading(true);
    try {
      let data: PostListType;
      if (type === '전체') {
        data = await getAllPostList();
      } else {
        data = await getPostListByType(type);
      }
      setPosts(data.posts);
    } catch (error) {
      console.error('게시글 불러오기 실패', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedType);
  }, [selectedType]);

  const TABS: { label: string; value: '전체' | PostTypeEnum }[] = [
    { label: '전체', value: '전체' },
    { label: '경험 공유', value: PostTypeEnum.EXPERIENCE },
    { label: '자료 공유', value: PostTypeEnum.FILE },
  ];

  // 검색어 기반 필터링된 게시글 (선택된 모드에 따라)
  const filteredPosts = posts.filter((post) => {
    if (!searchTerm) return true;
    if (searchMode === 'text') {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // 태그 검색 (쉼표, 공백 등으로 여러 개 입력 가능)
      const tagTerms = searchTerm
        .split(/[\\,\s]+/)
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      return (
        tagTerms.length === 0 ||
        tagTerms.every((term) =>
          post.tags.some((tag) => tag.toLowerCase().includes(term))
        )
      );
    }
  });

  return (
    <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
      {/* 검색창 + 글쓰기 버튼 */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-6">
        <div className="flex flex-col md:flex-row gap-0 w-full md:w-auto flex-1">
          {/* 검색 기준 드롭다운 + 인풋 */}
          <div className="flex w-full md:w-[calc(100%-135px)] h-12">
            <select
              value={searchMode}
              onChange={(e) => setSearchMode(e.target.value as 'text' | 'tag')}
              className="rounded-l-[10px] border border-brand-yellow bg-brand-yellow text-black font-normal px-4 focus:outline-none focus:ring-2 focus:ring-brand-yellow h-full min-w-[110px] transition-colors"
              style={{ borderRight: 'none' }}
            >
              <option
                value="text"
                className="bg-white text-brand-yellow font-normal hover:bg-brand-yellow hover:text-black"
              >
                제목&내용
              </option>
              <option
                value="tag"
                className="bg-white text-brand-yellow font-normal hover:bg-brand-yellow hover:text-black"
              >
                태그
              </option>
            </select>
            <div className="relative flex-1 min-w-0" style={{ flexGrow: 3 }}>
              {searchMode === 'text' ? (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              ) : (
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              )}
              <Input
                placeholder={
                  searchMode === 'text'
                    ? '제목, 내용 검색'
                    : '태그 검색 (여러 개 입력 가능)'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-full rounded-l-none rounded-r-[10px] border border-brand-yellow border-l-0 focus:ring-2 focus:ring-brand-yellow bg-white text-black font-normal"
                style={{ borderLeft: 'none' }}
              />
            </div>
          </div>
        </div>
        <Button
          className="whitespace-nowrap h-12 bg-brand-yellow hover:bg-brand-yellow-dark text-black mt-2 md:mt-0"
          onClick={() => navigate('/community/write')}
        >
          글쓰기
        </Button>
      </div>

      {/* 탭 필터 */}
      <div className="inline-flex mb-6 bg-brand-gray-50 rounded-full p-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedType(tab.value)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${
              selectedType === tab.value
                ? 'bg-white shadow text-black'
                : 'text-brand-gray-500 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 게시글 리스트 */}
      {loading ? (
        <p>로딩중...</p>
      ) : filteredPosts.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <CommunityCard
              key={post.id}
              post={post}
              commentCount={post.commentCnt}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommunityList;
