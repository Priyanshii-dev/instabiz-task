import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../../config/env';

/**
 * Catches every error forwarded via next(err) (including from asyncHandler)
 * and returns a consistent JSON error shape. Must be registered LAST in app.ts.
 */
export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details ? { errors: err.details } : {}),
    });
  }

  console.error('Unhandled error:', err);

  return res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    ...(env.isProd
      ? {}
      : { debug: err instanceof Error ? err.message : String(err) }),
  });
}

export function notFoundMiddleware(req: Request, res: Response) {
  res
    .status(404)
    .json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
}
