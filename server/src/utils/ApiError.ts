export class ApiError extends Error {
  statusCode: number;
  code: string;
  field?: string;
  details?: unknown;
  isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    code = 'ERROR',
    field?: string,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.field = field;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, field?: string, details?: unknown): ApiError {
    return new ApiError(400, message, 'BAD_REQUEST', field, details);
  }

  static unauthorized(message = 'Unauthorized'): ApiError {
    return new ApiError(401, message, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Forbidden'): ApiError {
    return new ApiError(403, message, 'FORBIDDEN');
  }

  static notFound(message = 'Not found'): ApiError {
    return new ApiError(404, message, 'NOT_FOUND');
  }

  static conflict(message: string, field?: string): ApiError {
    return new ApiError(409, message, 'CONFLICT', field);
  }

  static validation(message: string, details?: unknown): ApiError {
    return new ApiError(422, message, 'VALIDATION_ERROR', undefined, details);
  }
}
