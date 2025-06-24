import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import JobCard from "./jobCard";
import { JobType } from "@/apis/job/type";

interface JobListProps {
  jobs: JobType[];
  jobCnt: number;
}

const COUNTRY_KR_LABELS: Record<string, string> = {
  AR: "아르헨티나",
  AU: "호주",
  BR: "브라질",
  CA: "캐나다",
  CN: "중국",
  DE: "독일",
  DK: "덴마크",
  ES: "스페인",
  FI: "핀란드",
  FR: "프랑스",
  GB: "영국",
  IN: "인도",
  IT: "이탈리아",
  JP: "일본",
  KR: "한국",
  MX: "멕시코",
  NL: "네덜란드",
  NO: "노르웨이",
  PL: "폴란드",
  RU: "러시아",
  SE: "스웨덴",
  US: "미국",
  ZA: "남아프리카 공화국",
};

const sortedCountryCodes = Object.keys(COUNTRY_KR_LABELS).sort(); // 영어 기준 오름차순

const JobList: React.FC<JobListProps> = ({ jobs, jobCnt }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("전체");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry =
      selectedCountry === "전체" || job.location.includes(selectedCountry);
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-10">
      {/* 상단 제목 & 설명 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">채용공고</h1>
        <p className="text-gray-600">
          다양한 국가별 직무와 채용공고를 확인하고 지원해보세요.
        </p>
      </div>

      {/* 검색창 */}
      <div className="relative w-full max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* 국가 필터 */}
      <div className="w-full">
        <div className="mb-2 font-semibold text-sm text-gray-700">국가</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          <button
            onClick={() => setSelectedCountry("전체")}
            className={`text-sm px-3 py-2 rounded-full transition border 
              ${
                selectedCountry === "전체"
                  ? "bg-brand-yellow text-black border-transparent font-semibold"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
              }`}
          >
            전체
          </button>

          {sortedCountryCodes.map((code) => (
            <button
              key={code}
              onClick={() => setSelectedCountry(code)}
              className={`text-sm px-3 py-2 rounded-full transition border 
                ${
                  selectedCountry === code
                    ? "bg-brand-yellow text-black border-transparent font-semibold"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
                }`}
            >
              {COUNTRY_KR_LABELS[code]}
            </button>
          ))}
        </div>
      </div>

      {/* 채용공고 목록 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          총 {filteredJobs.length}개의 채용공고
        </h2>
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
