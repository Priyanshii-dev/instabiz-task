import rateLimit from 'express-rate-limit';

const keyGenerator = (req: any): string => {
  if (req.ip) return req.ip;
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return 'unknown';
};

const validate = { ip: false, trustProxy: false, xForwardedForHeader: false };

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  validate,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  validate,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

export const enquiryCreateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  validate,
  message: {
    success: false,
    message: 'Too many enquiries submitted. Please try again later.',
  },
});