export interface JobType {
  id: string;
  title: string;
  description: string;
  company: string;
  companyLogo: string | null;
  companyWebsite?: string | null;
  companyLinkedin?: string | null;
  companyTwitter?: string | null;
  companyGithub?: string | null;
  isAgency: boolean;
  employmentType: string;
  location: string;
  publishedDate: number;
  applicationUrl: string | null;
  experienceLevel: string;
  language: string;
  isBookmarked: boolean;
  countryCode: string;
}

export interface JobListType {
  jobs: JobType[];
  jobCnt: number;
}

export interface JobDetailType {
  id: string;
  title: string;
  description: string;
  company: string;
  companyLogo: string | null;
  companyWebsite: string | null;
  companyLinkedin: string | null;
  companyTwitter: string | null;
  companyGithub: string | null;
  isAgency: boolean;
  employmentType: string;
  location: string;
  hasRemote: boolean;
  countryCode: string;
  countryName: string;
  stateName: string | null;
  cityName: string | null;
  regionName: string | null;
  publishedDate: string;
  applicationUrl: string | null;
  experienceLevel: string;
  language: string;
  isBookmarked: boolean;
}

export enum CountryCodeEnum {
  IN = 'India',
  US = 'United States',
  GB = 'United Kingdom',
  FR = 'France',
  DE = 'Germany',
  ES = 'Spain',
  IT = 'Italy',
  CA = 'Canada',
  AU = 'Australia',
  NL = 'Netherlands',
  PL = 'Poland',
  BR = 'Brazil',
  RU = 'Russia',
  JP = 'Japan',
  KR = 'South Korea',
  CN = 'China',
  ZA = 'South Africa',
  MX = 'Mexico',
  AR = 'Argentina',
  SE = 'Sweden',
  NO = 'Norway',
  DK = 'Denmark',
  FI = 'Finland',
}

export const CountryCodeToKoreanMap = {
  [CountryCodeEnum.IN]: '인도',
  [CountryCodeEnum.US]: '미국',
  [CountryCodeEnum.GB]: '영국',
  [CountryCodeEnum.FR]: '프랑스',
  [CountryCodeEnum.DE]: '독일',
  [CountryCodeEnum.ES]: '스페인',
  [CountryCodeEnum.IT]: '이탈리아',
  [CountryCodeEnum.CA]: '캐나다',
  [CountryCodeEnum.AU]: '호주',
  [CountryCodeEnum.NL]: '네덜란드',
  [CountryCodeEnum.PL]: '폴란드',
  [CountryCodeEnum.BR]: '브라질',
  [CountryCodeEnum.RU]: '러시아',
  [CountryCodeEnum.JP]: '일본',
  [CountryCodeEnum.KR]: '한국',
  [CountryCodeEnum.CN]: '중국',
  [CountryCodeEnum.ZA]: '남아프리카 공화국',
  [CountryCodeEnum.MX]: '멕시코',
  [CountryCodeEnum.AR]: '아르헨티나',
  [CountryCodeEnum.SE]: '스웨덴',
  [CountryCodeEnum.NO]: '노르웨이',
  [CountryCodeEnum.DK]: '덴마크',
  [CountryCodeEnum.FI]: '핀란드',
};
