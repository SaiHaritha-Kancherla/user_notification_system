import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserNotificationModule } from './user-notification/user-notification.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserNotificationQueueModule } from './user-notification-queue/user-notification-queue.module';
import { SchedulerService } from './scheduler.service';
import { RequestLoggingMiddleware } from './middleware/request-logging';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './rate-limitting/custom-throttle.guard';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    UserNotificationModule,
    UserPreferenceModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    UserNotificationQueueModule,
    ThrottlerModule.forRoot([
      {
        ttl: 0,
        limit: 0,
      },
    ]),
  ],
  controllers: [],
  providers: [
    SchedulerService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
