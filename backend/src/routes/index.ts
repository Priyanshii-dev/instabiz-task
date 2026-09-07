import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import enquiryRoutes from '../modules/enquiry/enquiry.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/enquiries', enquiryRoutes);

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'InstaBizWeb API is running' });
});

export default router;
