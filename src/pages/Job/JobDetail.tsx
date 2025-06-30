import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getJobListById } from '@/apis/job';
import { JobDetailType } from '@/apis/job/type';
import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import Bookmark from '@/assets/Bookmark.svg';
import Bookmarked from '@/assets/Bookmarked.svg';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [bookmarked, setBookmarked] = useState(false);

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

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  };

  return (
    <Layout>
      <div className="pt-10 pb-20">
        <div className="container px-4 md:px-6">
          {/* 헤더: 경력 뱃지 + 타이틀 + 회사 로고 */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-brand-yellow text-black px-2 py-1 rounded text-sm font-semibold">
                {job.experienceLevel}
              </span>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold mr-2">{job.title}</h1>
                <button
                  onClick={handleBookmarkClick}
                  tabIndex={-1}
                  aria-label={bookmarked ? '북마크됨' : '북마크'}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                  className="align-top"
                >
                  <img
                    src={bookmarked ? Bookmarked : Bookmark}
                    alt={bookmarked ? 'Bookmarked' : 'Bookmark'}
                    className="w-7 h-7 m-0 p-0 align-top"
                  />
                </button>
              </div>
            </div>
            {job.companyLogo && (
              <img
                src={job.companyLogo}
                alt="Company Logo"
                className="w-12 h-12 object-contain"
              />
            )}
          </div>

          {/* 회사명 + 웹사이트 링크 */}
          <div className="mb-4 text-brand-gray-600 text-sm">
            <span>{job.company}</span>
            {job.companyWebsite && (
              <>
                {' | '}
                <a
                  href={job.companyWebsite}
                  className="text-brand-blue underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  회사 웹사이트
                </a>
              </>
            )}
          </div>

          {/* 주요 정보 */}
          <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
            <InfoRow label="경력">{job.experienceLevel}</InfoRow>
            <InfoRow label="직무">{job.employmentType || '정보 없음'}</InfoRow>
            <InfoRow label="근무지">{job.location || '정보 없음'}</InfoRow>
            <InfoRow label="재택 근무">
              {job.hasRemote ? '가능' : '불가'}
            </InfoRow>
            <InfoRow label="국가">
              {job.countryName} ({job.countryCode})
            </InfoRow>
            {job.stateName && <InfoRow label="주">{job.stateName}</InfoRow>}
            {job.cityName && <InfoRow label="도시">{job.cityName}</InfoRow>}
            {job.regionName && <InfoRow label="지역">{job.regionName}</InfoRow>}
            <InfoRow label="언어">{job.language || '명시되지 않음'}</InfoRow>
            <InfoRow label="공고 게시일">{job.publishedDate}</InfoRow>
            <InfoRow label="에이전시 여부">
              {job.isAgency ? '에이전시' : '직접 고용'}
            </InfoRow>
          </div>

          {/* 소셜 링크 */}
          {(job.companyLinkedin || job.companyGithub || job.companyTwitter) && (
            <div className="mb-6 text-sm text-brand-gray-700 flex gap-4">
              {job.companyLinkedin && (
                <a
                  href={job.companyLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  LinkedIn
                </a>
              )}
              {job.companyGithub && (
                <a
                  href={job.companyGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  GitHub
                </a>
              )}
              {job.companyTwitter && (
                <a
                  href={job.companyTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Twitter
                </a>
              )}
            </div>
          )}

          {/* 상세 설명 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">업무 내용</h2>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>

          {/* 지원하기 버튼 */}
          <div className="mb-6">
            <Button
              asChild
              className="bg-brand-yellow text-black font-semibold px-6 py-2 text-sm"
            >
              <a
                href={job.applicationUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
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

// 공통 정보 출력 컴포넌트
const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-2">
    <strong className="w-24 text-brand-gray-700">{label}:</strong>
    <span>{children}</span>
  </div>
);
