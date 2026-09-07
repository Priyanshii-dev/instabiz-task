import { Response } from 'express';

/**
 * Uniform success envelope for every API response so the frontend can rely
 * on a single shape: { success, message, data }.
 */
export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  });
}
