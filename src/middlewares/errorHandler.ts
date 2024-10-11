import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiError } from '../utils/ApiError';
import mongoose from 'mongoose';
import { getEnv } from '../env';

export function errorHandler(err: Error | ApiError, req: Request, res: Response, next: NextFunction) {
  let message = err.message || 'Internal Server Error.';
  let statusCode = err instanceof ApiError ? err.statusCode : 500;

  // Handle JWT Error
  if (err instanceof jwt.JsonWebTokenError) {
    message = `Invalid token. Unathorized access.`;
    statusCode = 401;
  } else if (err instanceof jwt.TokenExpiredError) {
    message = `Token is expired. Please login again.`;
    statusCode = 401;
  }

  // handle monogDb Error

  function isMongoError(error: any): error is mongoose.Error & { code: number; keyValue: any } {
    return (error as any).code !== undefined;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    message = 'Validation failed. Please check input data again.';
    statusCode = 400;
  } else if (err instanceof mongoose.Error.CastError) {
    message = `Invalid ${err.path} ${err.name} ${err.reason} ${err.value}`;
    statusCode = 400;
  } else if (isMongoError(err) && err.code === 1100) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists. Please use a different ${field}.`;
  }

  // send a response
  res.status(statusCode).json({
    message,
    success: false,
    statusCode,
    errorName: err.name || 'Error',
    stack: getEnv('NODE_ENV', 'development') === 'development' ? err.stack : '',
  });
}
