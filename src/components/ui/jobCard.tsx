import { Briefcase, MapPin, BarChart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JobType } from "@/apis/job/type";

interface JobCardProps {
  job: JobType;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const calculateDaysRemaining = (deadline: string): number => {
    const today = new Date();
    const end = new Date(deadline);
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getDeadlineBadgeColor = (days: number) => {
    if (days < 0) return "bg-gray-300 text-gray-600";
    if (days === 0) return "bg-red-500 text-white";
    if (days <= 3) return "bg-orange-400 text-white";
    return "bg-green-500 text-white";
  };

  const daysRemaining = calculateDaysRemaining(job.deadline);
  const deadlineBadgeColor = getDeadlineBadgeColor(daysRemaining);

  return (
    <div className="bg-white rounded-xl border border-brand-gray-200 p-6 hover:shadow-md transition-all hover-lift">
      <div className="flex items-start gap-4">
        <div className="bg-brand-gray-100 h-12 w-12 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          {job.nationImgUrl ? (
            <img
              src={job.nationImgUrl}
              alt={job.company}
              className="w-full h-full object-cover"
            />
          ) : (
            <Briefcase className="h-6 w-6 text-brand-gray-500" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-brand-yellow/10 text-brand-yellow-dark rounded-full">
              {job.location}
            </span>
            <span className="text-xs font-medium px-2 py-1 bg-brand-gray-100 text-brand-gray-700 rounded-full">
              {job.employmentType}
            </span>
            <Badge className={`ml-auto ${deadlineBadgeColor}`}>
              {daysRemaining > 0
                ? `마감 ${daysRemaining}일 전`
                : daysRemaining === 0
                ? "오늘 마감"
                : "마감됨"}
            </Badge>
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-brand-yellow transition-colors line-clamp-2">
            {job.title}
          </h3>

          <div className="mb-4">
            <p className="text-brand-gray-600 text-sm mb-1">{job.company}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <BarChart className="h-3.5 w-3.5" />
                {job.careerLevel}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {job.workHours}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-brand-gray-600">
              <span className="font-medium">${formatSalary(job.salary)}</span>
            </div>
            <div className="text-xs text-brand-gray-500">{job.deadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

const formatSalary = (salary: string) => {
  const [min, max] = salary.split("~").map((s) => s.trim());

  if (min === max) {
    return `${Number(min).toLocaleString()}`;
  }

  return `${Number(min).toLocaleString()} ~ ${Number(max).toLocaleString()}`;
};
