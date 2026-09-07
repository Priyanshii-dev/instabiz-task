import { authStorage } from './auth';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export class ApiRequestError extends Error {
  status: number;
  fieldErrors?: { field: string; message: string }[];

  constructor(
    message: string,
    status: number,
    fieldErrors?: { field: string; message: string }[],
  ) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  auth?: boolean; // attach Authorization header
  query?: Record<string, string | number | undefined>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

/**
 * Single fetch wrapper used by every API call in the app. Handles base URL,
 * JSON headers, optional auth token, query strings, and consistent error throwing.
 */
async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await requestWithResponse<T>(path, options);
  return response.data;
}

async function requestWithResponse<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiSuccessResponse<T>> {
  const { method = 'GET', body, auth = false, query } = options;

  let url = `${API_BASE_URL}${path}`;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== '')
        params.append(key, String(value));
    });
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (auth) {
    const token = authStorage.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new ApiRequestError(
      json?.message || 'Something went wrong',
      res.status,
      json?.errors,
    );
  }

  return json as ApiSuccessResponse<T>;
}

export const api = {
  get: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...opts, method: 'GET' }),
  post: <T>(
    path: string,
    body?: unknown,
    opts?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<T>(path, { ...opts, method: 'POST', body }),
  postWithResponse: <T>(
    path: string,
    body?: unknown,
    opts?: Omit<RequestOptions, 'method' | 'body'>,
  ) => requestWithResponse<T>(path, { ...opts, method: 'POST', body }),
  put: <T>(
    path: string,
    body?: unknown,
    opts?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<T>(path, { ...opts, method: 'PUT', body }),
  delete: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...opts, method: 'DELETE' }),
};
