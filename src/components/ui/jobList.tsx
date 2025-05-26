import React from "react";
import JobCard from "./jobCard";
import { JobType } from "@/apis/job/type";

interface JobListProps {
  jobs: JobType[];
  jobCnt: number;
}

const JobList: React.FC<JobListProps> = ({ jobs, jobCnt }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <h2 className="text-xl font-bold mb-4">총 {jobCnt}개의 채용공고</h2>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
