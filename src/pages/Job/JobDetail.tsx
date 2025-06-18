// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import Layout from "@/components/layout/Layout";
// import {
//   Calendar,
//   MapPin,
//   Clock,
//   Briefcase,
//   GraduationCap,
//   DollarSign,
//   Building,
//   Globe,
//   Heart,
// } from "lucide-react";

// // Mock job data
// const mockJobDetail = {
//   id: 1,
//   title:
//     "[미국/CA] 영 컨템포러리 여성의류 전문 홀세일 패션기업 - 그래픽디자이너 채용",
//   company: "(주)아이씨엔그룹",
//   location: "미국",
//   locationCode: "840",
//   category: "웹 디자이너",
//   careerLevel: "무관",
//   educationLevel: "대학(교) 졸업예정",
//   employmentType: "인턴12개월",
//   workHours: "7.5시간/5일",
//   salary: "5599 ~ 7466",
//   startDate: "2025-03-19",
//   endDate: "2025-05-19",
//   deadline: "2025/05/19(월)",
//   requirements: `
// ■ 자격조건 :
// - 그래픽 디자인 소프트웨어에 대한 기술적 지식 – (어도비 포토샵, 일러스트레이터, 인디자인, 라이트룸 등)
// - 진화하는 디자인 트렌드와 브랜드 이미지/미적 요구사항에 대한 창의력 필수
// - 애니메이션 작업 가능자 (애니메이션 그래픽, GIF, 웹사이트, 소셜 미디어용 멀티미디어 콘텐츠 등)
// - 브로셔, 포스터, 포장 라벨 등 인쇄물 제작 지식에 대한 전반적인 지식 우대`,
//   description: `그래픽 디자이너는 브랜드의 비주얼 아이덴티티를 구축하고 유지하는 역할을 담당합니다. 디지털 및 인쇄 마케팅 자료, 제품 포장, 웹사이트 디자인 등을 담당하여 브랜드의 일관된 이미지를 구축하고 소비자와의 시각적 커뮤니케이션을 이끌어갑니다.

// 주요 업무:
// - 브랜드 가이드라인에 따른 마케팅 자료 제작
// - 소셜 미디어용 그래픽 콘텐츠 디자인
// - 제품 카탈로그 및 룩북 디자인
// - 회사 웹사이트 및 이커머스 플랫폼용 비주얼 콘텐츠 제작
// - 제품 패키징 디자인`,
//   applyUrl: "https://www.worldjob.or.kr/advnc/view.do",
//   companyLogo: "https://www.worldjob.or.kr/design/images/nation/840.jpg",
//   companySize: 1,
//   companyFounded: 2011,
//   companyRevenue: "1900000000",
//   companyAddress:
//     "서울특별시 강남구 논현로87길 15 서울특별시 강남구 역삼동 736-54 LS빌딩",
//   companyWebsite: "www.icnkorea.com",
//   languageRequirement: "필수 영어(중상) : 영어로 업무 가능",
//   restDay: "협의",
//   visaType: "인턴비자",
//   decisionDate: "2025-05-20",
// };

// const JobDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const job = mockJobDetail;

//   if (!job) {
//     return (
//       <Layout>
//         <div className="container px-4 md:px-6 py-20">
//           <p>채용공고를 찾을 수 없습니다.</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="pt-10 pb-20 animate-fade-in">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* 메인 콘텐츠 */}
//             <div className="flex-1">
//               {/* 헤더 */}
//               <div className="bg-white rounded-xl border border-brand-gray-200 p-6 md:p-8 mb-8">
//                 <div className="flex items-start gap-4 mb-6">
//                   <div className="bg-brand-gray-100 h-16 w-16 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
//                     {job.companyLogo ? (
//                       <img
//                         src={job.companyLogo}
//                         alt={job.company}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <Briefcase className="h-8 w-8 text-brand-gray-500" />
//                     )}
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex flex-wrap gap-2 mb-2">
//                       <span className="text-xs font-medium px-2 py-1 bg-brand-yellow/10 text-brand-yellow-dark rounded-full">
//                         {job.location}
//                       </span>
//                       <span className="text-xs font-medium px-2 py-1 bg-brand-gray-100 text-brand-gray-700 rounded-full">
//                         {job.employmentType}
//                       </span>
//                     </div>

//                     <h1 className="text-2xl font-bold mb-2">{job.title}</h1>

//                     <p className="text-brand-gray-600">{job.company}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-brand-gray-100 pt-6">
//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <MapPin className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">위치</p>
//                       <p className="font-medium">{job.location}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <Briefcase className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">직종</p>
//                       <p className="font-medium">{job.category}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <Building className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">경력</p>
//                       <p className="font-medium">{job.careerLevel}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <GraduationCap className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">학력</p>
//                       <p className="font-medium">{job.educationLevel}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <Calendar className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">모집기간</p>
//                       <p className="font-medium">
//                         {job.startDate} ~ {job.endDate}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <DollarSign className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">급여</p>
//                       <p className="font-medium">${job.salary}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <Clock className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">근무시간</p>
//                       <p className="font-medium">{job.workHours}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-brand-gray-100 flex items-center justify-center flex-shrink-0">
//                       <Globe className="h-5 w-5 text-brand-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-brand-gray-500">어학요건</p>
//                       <p className="font-medium">{job.languageRequirement}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* 공고 내용 */}
//               <div className="bg-white rounded-xl border border-brand-gray-200 p-6 md:p-8 mb-8">
//                 <h2 className="text-xl font-bold mb-6">직무 내용</h2>
//                 <div className="prose max-w-none">
//                   <p className="whitespace-pre-line">{job.description}</p>
//                 </div>
//               </div>

//               {/* 공고 자격 */}
//               <div className="bg-white rounded-xl border border-brand-gray-200 p-6 md:p-8 mb-8">
//                 <h2 className="text-xl font-bold mb-6">지원 자격</h2>
//                 <div className="prose max-w-none">
//                   <p className="whitespace-pre-line">{job.requirements}</p>
//                 </div>
//               </div>

//               {/* 회사 정보 */}
//               <div className="bg-white rounded-xl border border-brand-gray-200 p-6 md:p-8">
//                 <h2 className="text-xl font-bold mb-6">기업 정보</h2>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <p className="min-w-28 text-brand-gray-600">회사명</p>
//                     <p className="font-medium">{job.company}</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <p className="min-w-28 text-brand-gray-600">설립연도</p>
//                     <p className="font-medium">{job.companyFounded}년</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <p className="min-w-28 text-brand-gray-600">회사규모</p>
//                     <p className="font-medium">{job.companySize}명</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <p className="min-w-28 text-brand-gray-600">매출액</p>
//                     <p className="font-medium">
//                       {parseInt(job.companyRevenue).toLocaleString()}원
//                     </p>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <p className="min-w-28 text-brand-gray-600">주소</p>
//                     <p className="font-medium">{job.companyAddress}</p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <p className="min-w-28 text-brand-gray-600">웹사이트</p>
//                     <a
//                       href={`https://${job.companyWebsite}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-medium text-brand-yellow hover:underline"
//                     >
//                       {job.companyWebsite}
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 사이드바 */}
//             <div className="w-full lg:w-80 flex-shrink-0">
//               <div className="sticky top-24">
//                 <div className="bg-white rounded-xl border border-brand-gray-200 p-6 mb-4">
//                   <div className="space-y-6">
//                     <div>
//                       <p className="text-brand-gray-600 mb-1">지원 마감일</p>
//                       <p className="text-xl font-bold text-brand-yellow-dark">
//                         {job.deadline}
//                       </p>
//                     </div>

//                     <div>
//                       <p className="text-brand-gray-600 mb-1">
//                         합격자 발표 예정일
//                       </p>
//                       <p className="font-medium">{job.decisionDate}</p>
//                     </div>

//                     <div>
//                       <p className="text-brand-gray-600 mb-1">비자 종류</p>
//                       <p className="font-medium">{job.visaType}</p>
//                     </div>

//                     <div>
//                       <p className="text-brand-gray-600 mb-1">휴일</p>
//                       <p className="font-medium">{job.restDay}</p>
//                     </div>
//                   </div>

//                   <div className="mt-8 space-y-3">
//                     <a
//                       href={job.applyUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Button className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-black font-medium h-12">
//                         지원하기
//                       </Button>
//                     </a>
//                     <Button variant="outline" className="w-full h-12">
//                       <Heart className="h-5 w-5 mr-2" />
//                       관심공고 등록
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="bg-brand-yellow/10 rounded-xl p-6">
//                   <h3 className="font-bold mb-4">관련 채용공고</h3>
//                   <div className="space-y-4">
//                     {[2, 3, 4].map((jobId) => (
//                       <Link
//                         key={jobId}
//                         to={`/jobs/${jobId}`}
//                         className="block bg-white rounded-lg p-3 hover:shadow-sm transition-shadow"
//                       >
//                         <p className="text-xs text-brand-gray-500 mb-1">
//                           웹 디자이너 • 미국
//                         </p>
//                         <p className="font-medium text-sm line-clamp-2 hover:text-brand-yellow transition-colors">
//                           미국 IT기업 UX/UI 디자이너 채용 (경력 무관)
//                         </p>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default JobDetail;

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { MapPin, Briefcase, GraduationCap, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getJobListById } from '@/apis/job';
import { JobDetailType } from '@/apis/job/type';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery<JobDetailType>({
    queryKey: ['jobDetail', id],
    queryFn: () => getJobListById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p>채용공고를 불러오는 중입니다...</p>
        </div>
      </Layout>
    );
  }

  if (isError || !job) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p>채용공고를 찾을 수 없습니다.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-10 pb-20">
        <div className="container px-4 md:px-6">
          <div className="text-2xl font-bold mb-2">{job.title}</div>
          <p className="text-brand-gray-600 mb-4">{job.company}</p>

          <div className="grid gap-4 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {job.category}
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              {job.educationLevel}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {job.salary}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {job.workHours}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">업무 내용</h2>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mb-6">
            <Button asChild className="bg-brand-yellow text-black font-semibold">
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                지원하러 가기
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetail;
