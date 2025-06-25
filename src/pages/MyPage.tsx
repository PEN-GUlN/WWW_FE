import Layout from "@/components/layout/Layout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { JobType } from "@/apis/job/type";
import JobCard from "@/components/ui/jobCard";
import { Default } from "@/assets";

// 더미 유저 데이터
const user = {
  email: "qpalzm00265@gmail.com",
  interest: "기계/금속",
};

// 더미 북마크 공고 데이터 (비어있으면 안내 메시지)
const bookmarkedJobs: JobType[] = [
  {
    id: "744000065867957",
    title:
      "Software Engineer-1 (Python Developer, Data Extraction and Web Scraping)",
    description:
      "Wiser Solutions is looking for a Python Developer for web crawling and data extraction.",
    company: "Wiser Solutions",
    companyLogo: "https://jobdataapi.com/media/company/logo/23/07/WiserInc.jpg",
    isAgency: false,
    employmentType: "Full Time",
    location: "Remote, India",
    publishedDate: 3,
    applicationUrl:
      "https://jobs.smartrecruiters.com/WiserSolutions/744000065867957-software-engineer-1-python-developer-data-extraction-and-web-scraping-",
    experienceLevel: "Entry Level(초급)",
    language: "en",
  },
];

const MyPage = () => {
  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">마이페이지</h1>
        {/* 프로필 영역 */}
        <div className="flex items-center gap-6 mb-10 p-6 bg-white rounded-xl border border-brand-gray-100 shadow-sm">
          <Avatar className="h-20 w-20">
            <AvatarImage src={Default} alt={user.email} />
            <AvatarFallback>{user.email.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-xl font-semibold mb-1">{user.email}</div>
            <div className="text-brand-gray-600 text-sm">
              관심분야: {user.interest}
            </div>
          </div>
        </div>

        {/* 북마크한 공고 리스트 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">북마크한 공고</h2>
          {bookmarkedJobs.length === 0 ? (
            <div className="text-center text-brand-gray-500 py-16 border border-dashed border-brand-gray-200 rounded-lg">
              아직 북마크한 공고가 없습니다
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedJobs.map((job) => (
                <JobCard key={job.id} job={job} isBookmarked={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
