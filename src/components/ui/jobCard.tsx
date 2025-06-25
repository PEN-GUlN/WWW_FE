import { Briefcase, MapPin, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JobType } from "@/apis/job/type";
import { useNavigate } from "react-router-dom";
import Bookmark from "@/assets/Bookmark.svg";
import Bookmarked from "@/assets/Bookmarked.svg";
import { useState } from "react";

interface JobCardProps {
  job: JobType;
  isBookmarked?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked = false }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleCardClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  };

  const getDaysAgo = (publishedDate: number) => {
    return publishedDate === 0 ? "오늘 게시됨" : `${publishedDate}일 전 게시됨`;
  };

  return (
    <div
      className="bg-white rounded-xl border border-brand-gray-200 p-6 hover:shadow-md transition-all hover-lift cursor-pointer mx-[30px] relative"
      onClick={handleCardClick}
    >
      {/* 북마크 아이콘 */}
      <button
        className="absolute top-0 right-4 z-10"
        onClick={handleBookmarkClick}
        tabIndex={-1}
        aria-label={bookmarked ? "북마크됨" : "북마크"}
        style={{ background: "none", border: "none", padding: 0, margin: 0 }}
      >
        <img
          src={bookmarked ? Bookmarked : Bookmark}
          alt={bookmarked ? "Bookmarked" : "Bookmark"}
          className="w-7 h-7 m-0 p-0 align-top"
        />
      </button>
      <div className="flex items-start gap-4">
        {/* 회사 로고 or 기본 아이콘 */}
        <div className="bg-brand-gray-100 h-12 w-12 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-full h-full object-cover"
            />
          ) : (
            <Briefcase className="h-6 w-6 text-brand-gray-500" />
          )}
        </div>

        <div className="flex-1">
          {/* 상단 태그들 */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-brand-yellow/10 text-brand-yellow-dark rounded-full">
              {job.employmentType}
            </span>
            <Badge className="bg-green-100 text-green-800 text-xs">
              {getDaysAgo(job.publishedDate)}
            </Badge>
          </div>

          {/* 제목 */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-brand-yellow transition-colors line-clamp-2">
            {job.title}
          </h3>

          {/* 회사명 및 기타 정보 */}
          <div className="mb-4">
            <p className="text-brand-gray-600 text-sm mb-1">{job.company}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <BarChart className="h-3.5 w-3.5" />
                {job.experienceLevel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
