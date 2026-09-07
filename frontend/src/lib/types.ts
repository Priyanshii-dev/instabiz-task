export type EnquiryStatus = 'new' | 'in_progress' | 'resolved';

export interface Enquiry {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface EnquiryFormValues {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  service: string;
  message: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminProfile {
  id: number;
  name: string;
  email: string;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: { field: string; message: string }[];
}
