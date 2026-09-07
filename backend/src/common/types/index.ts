export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string; // hashed
  created_at: string;
  updated_at: string;
}

export type AdminPublic = Omit<Admin, 'password'>;

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

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JwtPayload {
  adminId: number;
  email: string;
}

// Augment Express's Request type with the authenticated admin (set by auth middleware)
declare global {
  namespace Express {
    interface Request {
      admin?: JwtPayload;
    }
  }
}
