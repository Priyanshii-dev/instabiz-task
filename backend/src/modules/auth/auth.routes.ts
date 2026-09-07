import { Router } from 'express';
import { getProfile, login } from './auth.controller';
import { validate } from '../../common/middleware/validate.middleware';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { loginLimiter } from '../../common/middleware/rateLimiter';
import { loginSchema } from './auth.validator';

const router = Router();

router.post('/login', loginLimiter, validate(loginSchema), login);
router.get('/me', requireAuth, getProfile);

export default router;
