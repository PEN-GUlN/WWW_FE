import { useEffect, useState } from "react";
import { PostListType, PostTypeEnum, PostType } from "@/apis/post/type";
import { getAllPostList, getPostListByType } from "@/apis/post";
import CommunityCard from "./communityCard";
import { Search } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

const CommunityList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedType, setSelectedType] = useState<"전체" | PostTypeEnum>(
    "전체"
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchPosts = async (type: "전체" | PostTypeEnum) => {
    setLoading(true);
    try {
      let data: PostListType;
      if (type === "전체") {
        data = await getAllPostList();
      } else {
        data = await getPostListByType(type);
      }
      setPosts(data.posts);
    } catch (error) {
      console.error("게시글 불러오기 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedType);
  }, [selectedType]);

  const TABS: { label: string; value: "전체" | PostTypeEnum }[] = [
    { label: "전체", value: "전체" },
    { label: "경험 공유", value: PostTypeEnum.EXPERIENCE },
    { label: "자료 공유", value: PostTypeEnum.FILE },
  ];

  // 검색어 기반 필터링된 게시글
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
      {/* 검색창 + 글쓰기 버튼 */}
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button
          className="whitespace-nowrap h-12 bg-brand-yellow hover:bg-brand-yellow-dark text-black"
          onClick={() => navigate("/community/write")}
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
                ? "bg-white shadow text-black"
                : "text-brand-gray-500 hover:text-black"
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
