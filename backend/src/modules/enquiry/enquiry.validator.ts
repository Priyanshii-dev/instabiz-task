import { z } from 'zod';

export const SERVICE_OPTIONS = [
  'Website Development',
  'Web/Mobile App Development',
  'CRM',
  'ERP/Odoo',
  'Custom Software',
  'Business Automation',
  'AI Automation',
  'API Integration',
  'Digital Marketing',
  'Other',
] as const;
const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;

export const createEnquirySchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(150),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number'),
  company_name: z.string().trim().min(1, 'Company name is required').max(150),
  service: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: 'Select a valid service' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000),
});

export const updateEnquirySchema = createEnquirySchema
  .partial()
  .extend({ status: z.enum(['new', 'in_progress', 'resolved']).optional() });
export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  search: z.string().trim().optional(),
  service: z.string().trim().optional(),
  status: z.enum(['new', 'in_progress', 'resolved']).optional(),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryInput = z.infer<typeof updateEnquirySchema>;
export type ListQueryInput = z.infer<typeof listQuerySchema>;
