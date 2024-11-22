import { Module } from '@nestjs/common';
import { UserNotificationQueueService } from './user-notification-queue.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserNotificationQueue,
  UserNotificationQueueSchema,
} from './user-notification-queue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserNotificationQueue.name, schema: UserNotificationQueueSchema },
    ]),
  ],
  providers: [UserNotificationQueueService],
  exports: [UserNotificationQueueService],
})
export class UserNotificationQueueModule {}
