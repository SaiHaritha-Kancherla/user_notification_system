// custom-throttler.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    const response = context.switchToHttp().getResponse();
    response.status(429).json({
      statusCode: 429,
      message: 'Too many requests, please try again later.',
      limit: throttlerLimitDetail.limit,
      ttl: throttlerLimitDetail.ttl,
    });
  }
}
