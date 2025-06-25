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
          {/* CommunityList 컴포넌트 사용 */}
          <CommunityList />
        </div>
      </div>
    </Layout>
  );
};

export default Community;
