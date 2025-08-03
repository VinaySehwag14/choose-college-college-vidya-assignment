// src/types/college.ts

export interface FeeType {
  fee_type: string;
}

export interface CourseFeeDetail {
  id: number;
  fee_type: FeeType;
  fee: string;
  priority: number;
  status: number;
  universities_courses: number;
}

export interface UniversityBanner {
  id: number;
  banner: string;
  video_link: string | null;
  priority: number | null;
  banner_type: number;
  status: number;
  universities: number;
}

export interface ApprovalDetail {
  id: number;
  title: string;
  logo: string;
  status: number;
  priority: number;
  accreditation_description: string | null;
}

export interface University {
  id: number;
  ptu_count: number;
  compare_count: number;
  fake_review_count: number;
  cv_rating: string;
  review_count: number;
  logo: string;
  name: string;
  slug: string;
  owner_by: number;
  universty_banner: UniversityBanner[];
  approval_details: ApprovalDetail[];
}

export interface CollegeData {
  fee: number;
  full_fee_usd: number | null;
  university: University;
  courses_fee_details: CourseFeeDetail[];
  courses_fee_usd_details: CourseFeeDetail[];
}

export interface ApiResponse {
  data: CollegeData[];
}
