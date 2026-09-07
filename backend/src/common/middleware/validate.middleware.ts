import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../utils/AppError';

type Target = 'body' | 'query' | 'params';

/**
 * Generic request-validation middleware factory. Pass any Zod schema and the
 * part of the request to validate; on success the parsed (and coerced) value
 * replaces req[target] so controllers get clean, typed data.
 */
export function validate(schema: AnyZodObject, target: Target = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return next(new AppError('Validation failed', 400, details));
      }
      next(err);
    }
  };
}
