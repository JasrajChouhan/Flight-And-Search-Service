import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimitMiddleware } from './rateLimitMiddleware';

export function appMiddleware(app: Express) {
  app.use(express.json({ limit: '16kb' }));
  app.use(express.urlencoded({ limit: '16kb', extended: true }));

  // performane and security middleware
  app.use(cors());
  app.use(helmet());
  app.use(compression());

  //Logging
  app.use(morgan('dev'));

  //Cookies management
  app.use(cookieParser());

  // rate-limit-middleware
  app.use(rateLimitMiddleware);

  //unhandle promise rejection error
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Promise Rejection:', reason);
    process.exit(1);
  });

  //unhandle uncaught exception error
  process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error.message);
    process.exit(1);
  });
}
