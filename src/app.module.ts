import { Module } from '@nestjs/common';
import { UserNotificationModule } from './user-notification/user-notification.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserNotificationQueueModule } from './user-notification-queue/user-notification-queue.module';
import { SchedulerService } from './scheduler.service';

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
  ],
  controllers: [],
  providers: [SchedulerService],
})
export class AppModule {}
