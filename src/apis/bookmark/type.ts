import { JobType } from '../job/type';

export interface BookmarkListResponseType {
  bookmarkCnt: number;
  bookmarks: BookmarkResponseType[];
}

export interface BookmarkResponseType {
  id: number;
  jobInfo: JobType;
}

export interface BookmarkRequestType {
  jobId: number;
  status: boolean;
}
