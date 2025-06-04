import React from "react";
import JobCard from "./jobCard";
import { JobType } from "@/apis/job/type";

interface JobListProps {
  jobs: JobType[];
  jobCnt: number;
}

const JobList: React.FC<JobListProps> = ({ jobs, jobCnt }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">채용공고가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">총 {jobCnt}개의 채용공고</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
