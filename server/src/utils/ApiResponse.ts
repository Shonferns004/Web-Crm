import type { Response } from 'express';

export interface ApiResponseBody<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors: null;
}

export function ok<T>(res: Response, data: T, message = 'OK', status = 200): Response {
  const body: ApiResponseBody<T> = { success: true, message, data, errors: null };
  return res.status(status).json(body);
}
