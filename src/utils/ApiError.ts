import { getEnv } from '../env';

export class ApiError extends Error {
  message: string;
  stack?: string | undefined;
  statusCode: number;
  data: null;
  errors: string[];

  constructor(statusCode: number, message = 'Something went wrong', stack: string = '', errors: string[] = []) {
    super(message);
    this.data = null;
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;
    this.stack = stack;

    const isProduction = getEnv('NODE_ENV', 'production');

    if (stack) {
      this.stack = isProduction === 'development' ? stack : '';
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
