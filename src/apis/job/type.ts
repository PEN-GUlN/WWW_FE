import { Interest } from '../user/type';

export interface JobType {
  id: number;
  company: string;
  title: string;
  description: string;
  workHours: string;
  careerLevel: string;
  employmentType: string;
  salary: string;
  deadline: string;
  location: string;
  nationImgUrl: string;
}

export interface JobListType {
  jobs: JobType[];
  jobCnt: number;
}

export interface JobDetailType {
  id: number;
  title: string;
  description: string;
  company: string;
  category: Interest;
  careerLevel: string;
  educationLevel: string;
  employmentType: string;
  workHours: string;
  salary: string;
  location: string;
  deadline: string;
  postedDate: string;
  linkUrl: string;
  applyUrl: string;
  nationImgUrl: string;
}
