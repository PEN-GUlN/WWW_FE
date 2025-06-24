import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CommunityList from "@/components/ui/communityList";
import Layout from "@/components/layout/Layout";

const Community = () => {
  const navigate = useNavigate();

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

          {/* 글쓰기 버튼 */}
          <div className="flex justify-end mb-6">
            <Button
              className="bg-brand-yellow hover:bg-brand-yellow-dark text-black"
              onClick={handleWritePost}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              글쓰기
            </Button>
          </div>

          {/* CommunityList 컴포넌트 사용 */}
          <CommunityList />
        </div>
      </div>
    </Layout>
  );
};

export default Community;
