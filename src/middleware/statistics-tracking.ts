import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class StatisticsMiddleware implements NestMiddleware {
  private requestCount = 0;

  use = (req: Request, res: Response, next: NextFunction) => {
    this.requestCount++; // Correctly increment request count

    const start = Date.now();

    // Calculate request-response time
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `Request #${this.requestCount} to ${req.originalUrl} took ${duration}ms`,
      );
    });

    next();
  };
}
