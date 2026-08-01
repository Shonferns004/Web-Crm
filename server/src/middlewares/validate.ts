import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodSchema } from 'zod';
import { ApiError } from '../utils/ApiError';

type ValidateSource = 'body' | 'query' | 'params';

/**
 * Validate request input against a Zod schema.
 * Schema `.safeParse` is used so partial source types are handled by the schema itself.
 */
export function validate(schema: ZodSchema, source: ValidateSource = 'body'): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req[source];
    const result = schema.safeParse(data ?? {});

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        code: issue.code,
        message: issue.message,
        path: issue.path.join('.'),
      }));
      return next(ApiError.validation('Validation failed', details));
    }

    if (source === 'body') {
      req.body = result.data;
    } else if (source === 'query') {
      req.query = result.data as unknown as Request['query'];
    }

    return next();
  };
}
