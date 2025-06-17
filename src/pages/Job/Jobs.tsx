import { useQuery } from "@tanstack/react-query";
import JobList from "@/components/ui/jobList";
import { getAllJobList } from "@/apis/job";
import { JobListType } from "@/apis/job/type";
import Layout from "@/components/layout/Layout";

export default function Jobs() {
  const { data, isLoading, isError } = useQuery<JobListType>({
    queryKey: ["jobs"],
    queryFn: getAllJobList,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  const jobList = data?.jobs || [];
  const jobCnt = data?.jobCnt || 0;

  return (
    <Layout>
      <div className="pt-10 pb-20 animate-fade-in">
        <JobList jobs={jobList} jobCnt={jobCnt} />
      </div>
    </Layout>
  );
}
