import { NextFunction, Request, Response } from 'express';

import { RateLimiterMemory } from 'rate-limiter-flexible';

export async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const rateLimit = new RateLimiterMemory({
    points: 20,
    duration: 60,
  });

  let ipAddress = req.ip as string | number;

  if (!ipAddress) {
    res.status(400).json({
      message: 'client is dissconned is ip not found.',
      success: false,
    });
  }

  try {
    await rateLimit.consume(ipAddress);
    next();
  } catch (error: any) {
    res.status(429).json({
      message: error.message || 'Too many request. Please wait.',
      success: false,
    });
  }
}
