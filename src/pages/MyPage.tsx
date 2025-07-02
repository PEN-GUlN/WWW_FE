import Layout from '@/components/layout/Layout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import JobCard from '@/components/ui/jobCard';
import CommunityCard from '@/components/ui/communityCard';
import { Default } from '@/assets';
import { myPageType } from '@/apis/user/type';
import { getMyPage } from '@/apis/user';
import { PostType } from '@/apis/post/type';
import { useEffect, useState, useContext } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthContext } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PostWithCommentCount extends PostType {
  commentCount: number;
}

const MyPage = () => {
  const [user, setUser] = useState<myPageType | null>(null);
  const [loading, setLoading] = useState(false);
  const [postsWithCommentCount, setPostsWithCommentCount] = useState<
    PostWithCommentCount[]
  >([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // myPage api 호출
  const fetchData = async () => {
    setLoading(true);
    try {
      const data: myPageType = await getMyPage();
      setUser(data);

      // 각 게시글의 댓글 수를 바로 파싱
      const postsWithComments = data.posts.posts.map((post) => ({
        ...post,
        commentCount: post.commentCnt ?? 0,
      }));

      setPostsWithCommentCount(postsWithComments);
    } catch (error) {
      console.error('마이페이지 불러오기 실패', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
          <p>로딩중...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
          <p>사용자 정보를 불러올 수 없습니다.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

        {/* 프로필 영역 */}
        <div className="flex items-center gap-6 mb-10 p-6 bg-white rounded-xl border border-brand-gray-100 shadow-sm relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={Default} alt={user.email} />
            <AvatarFallback>{user.email.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-xl font-semibold mb-1">{user.email}</div>
            <div className="text-brand-gray-600 text-sm">
              관심분야: {user.interest.join(', ')}
            </div>
          </div>
          {/* 로그아웃 버튼 */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="로그아웃"
            className="absolute bottom-4 right-4 text-2xl hover:scale-110 transition-transform"
            aria-label="로그아웃"
          >
            🏃‍♂️
          </button>
        </div>

        {/* 탭으로 구분된 콘텐츠 */}
        <Tabs defaultValue="bookmarks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookmarks">북마크한 공고</TabsTrigger>
            <TabsTrigger value="posts">내가 쓴 글</TabsTrigger>
          </TabsList>

          <TabsContent value="bookmarks" className="mt-6">
            {user.bookmarkedPosts.bookmarks.length === 0 ? (
              <div className="text-center text-brand-gray-500 py-16 border border-dashed border-brand-gray-200 rounded-lg">
                아직 북마크한 공고가 없습니다
              </div>
            ) : (
              <div className="space-y-4">
                {user.bookmarkedPosts.bookmarks.map((bookmark) => (
                  <JobCard
                    key={bookmark.id}
                    job={bookmark.jobInfo}
                    isBookmarked={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            {postsWithCommentCount.length === 0 ? (
              <div className="text-center text-brand-gray-500 py-16 border border-dashed border-brand-gray-200 rounded-lg">
                아직 작성한 글이 없습니다
              </div>
            ) : (
              <div className="space-y-4">
                {postsWithCommentCount.map((post) => (
                  <CommunityCard
                    key={post.id}
                    post={post}
                    commentCount={post.commentCount}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyPage;
