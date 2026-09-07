import { z } from 'zod';
import { ENQUIRY_SERVICE_OPTIONS } from './constants';

const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;

/**
 * Client-side mirror of the backend's enquiry validator. Kept intentionally
 * simple and dependency-light (no react-hook-form) so it's easy to follow.
 */
export const enquirySchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number'),
  company_name: z.string().trim().min(1, 'Company name is required'),
  service: z.enum(ENQUIRY_SERVICE_OPTIONS, {
    errorMap: () => ({ message: 'Select a service' }),
  }),
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),
});

export type EnquirySchema = z.infer<typeof enquirySchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

/** Runs a zod schema and returns a flat { field: message } error map instead of throwing. */
export function getFieldErrors(
  schema: z.ZodTypeAny,
  values: unknown,
): Record<string, string> {
  const result = schema.safeParse(values);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
