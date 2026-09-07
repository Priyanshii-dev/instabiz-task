import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { verifyToken } from '../utils/jwt';

/**
 * Protects admin-only routes. Expects `Authorization: Bearer <token>`.
 * On success, attaches the decoded payload to req.admin.
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  const token = header.split(' ')[1];

  try {
    req.admin = verifyToken(token);
    next();
  } catch {
    next(new AppError('Invalid or expired session, please log in again', 401));
  }
}
