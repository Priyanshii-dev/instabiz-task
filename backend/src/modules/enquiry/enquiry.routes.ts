import { Router } from 'express';
import {
  createEnquiry,
  deleteEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
} from './enquiry.controller';
import { validate } from '../../common/middleware/validate.middleware';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { enquiryCreateLimiter } from '../../common/middleware/rateLimiter';
import {
  createEnquirySchema,
  listQuerySchema,
  updateEnquirySchema,
} from './enquiry.validator';

const router = Router();

router.post(
  '/',
  enquiryCreateLimiter,
  validate(createEnquirySchema),
  createEnquiry,
);
router.get(
  '/',
  requireAuth,
  validate(listQuerySchema, 'query'),
  getAllEnquiries,
);
router.get('/:id', requireAuth, getEnquiryById);
router.put('/:id', requireAuth, validate(updateEnquirySchema), updateEnquiry);
router.delete('/:id', requireAuth, deleteEnquiry);

export default router;
