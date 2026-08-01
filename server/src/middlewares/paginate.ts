import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { getPagination } from '../utils/pagination';

export function paginate(): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { page, limit, skip } = getPagination(req.query);
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

    req.pagination = { page, limit, skip, search, sortBy, sortOrder };
    return next();
  };
}
