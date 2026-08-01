import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

interface ErrorDetail {
  code: string;
  message: string;
  field?: string;
  details?: unknown;
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: null,
    errors: [{ code: 'NOT_FOUND', message: 'Route not found' }],
  });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  let statusCode = 500;
  const errors: ErrorDetail[] = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errors.push({ code: err.code, message: err.message, field: err.field, details: err.details });
  } else if (err instanceof ZodError) {
    statusCode = 422;
    for (const issue of err.issues) {
      errors.push({ code: issue.code, message: issue.message, field: issue.path.join('.') });
    }
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      const target = (err.meta?.target as string[] | undefined)?.join(', ') ?? 'field';
      errors.push({ code: 'CONFLICT', message: `A record with this ${target} already exists.`, field: target });
    } else if (err.code === 'P2025') {
      statusCode = 404;
      errors.push({ code: 'NOT_FOUND', message: 'Record not found' });
    } else {
      errors.push({ code: 'DATABASE_ERROR', message: 'Database operation failed' });
    }
  } else if (err instanceof Error) {
    errors.push({ code: 'INTERNAL', message: err.message });
  } else {
    errors.push({ code: 'INTERNAL', message: 'Unexpected error' });
  }

  if (statusCode === 500) {
    console.error('Unhandled error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message: errors[0]?.message ?? 'Something went wrong',
    data: null,
    errors,
  });
}
