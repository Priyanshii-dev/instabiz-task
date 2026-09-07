import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

const keyGenerator = (req: Parameters<typeof ipKeyGenerator>[0]) =>
  ipKeyGenerator(req.ip || req.socket?.remoteAddress || 'unknown');

/** Generous general limiter for the whole API. */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  validate: { ip: false, trustProxy: false, xForwardedForHeader: false },
});

/** Tighter limiter for the login endpoint to slow down brute-force attempts. */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  validate: { ip: false, trustProxy: false, xForwardedForHeader: false },
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

/** Prevents the public enquiry form from being used to spam the database. */
export const enquiryCreateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  validate: { ip: false, trustProxy: false, xForwardedForHeader: false },
  message: {
    success: false,
    message: 'Too many enquiries submitted. Please try again later.',
  },
});