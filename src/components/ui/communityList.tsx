import { useEffect, useState } from "react";
import { PostListType, PostTypeEnum, PostType } from "@/apis/post/type";
import { getAllPostList, getPostListByType } from "@/apis/post";
import CommunityCard from "./communityCard";

const CommunityList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedType, setSelectedType] = useState<"전체" | PostTypeEnum>(
    "전체"
  );
  const [loading, setLoading] = useState(false);

  // 게시글 데이터를 API에서 불러오는 함수
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

  // 탭 필터 목록
  const TABS: { label: string; value: "전체" | PostTypeEnum }[] = [
    { label: "전체", value: "전체" },
    { label: "경험 공유", value: PostTypeEnum.EXPERIENCE },
    { label: "자료 공유", value: PostTypeEnum.FILE },
  ];

  return (
    <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
      {/* 탭 필터 UI */}
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

      {/* 게시글 목록 */}
      {loading ? (
        <p>로딩중...</p>
      ) : posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <CommunityCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommunityList;
