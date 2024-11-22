import { Module } from '@nestjs/common';
import { UserNotificationsController } from './user-notification.controller';
import { UserNotificationService } from './user-notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserNotificationLog,
  UserNotificationLogSchema,
} from './user-notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserNotificationLog.name, schema: UserNotificationLogSchema },
    ]),
  ],
  controllers: [UserNotificationsController],
  providers: [UserNotificationService],
  exports: [UserNotificationService],
})
export class UserNotificationModule {}
