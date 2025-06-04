import { instance } from "..";
import { Interest } from "../user/type";
import { JobDetailType, JobListType } from "./type";

const router = "/job";

export const getAllJobList = async (): Promise<JobListType> => {
  const response = await instance.get(`${router}/query/all`);
  return response.data;
};

export const getJobListByCategory = async (
  category: Interest
): Promise<JobListType> => {
  const response = await instance.get(`${router}/query/${category}`);
  return response.data;
};

export const getJobListById = async (id: number): Promise<JobDetailType> => {
  const response = await instance.get(`${router}/query/detail/${id}`);
  return response.data;
};
