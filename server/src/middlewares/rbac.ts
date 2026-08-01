import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { ApiError } from '../utils/ApiError';

/**
 * Assert the authenticated user holds a given permission.
 * The permission set is scoped to the active org by the `orgScope` middleware.
 */
export function rbac(...permissions: string[]): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(ApiError.unauthorized());

    if (req.user.isMaster) return next();

    const granted = new Set(req.user.permissions);
    const missing = permissions.filter((p) => !granted.has(p));

    if (missing.length > 0) {
      return next(ApiError.forbidden(`Missing permission(s): ${missing.join(', ')}`));
    }

    return next();
  };
}
