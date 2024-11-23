import { Module } from '@nestjs/common';
import { UserPreferenceController } from './user-preference.controller';
import { UserPreferenceService } from './user-preference.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreference, UserPreferenceSchema } from './user-preference.schema';
import { UserNotificationQueueModule } from '../user-notification-queue/user-notification-queue.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPreference.name, schema: UserPreferenceSchema },
    ]),
    UserNotificationQueueModule,
  ],
  exports: [UserPreferenceService],
  controllers: [UserPreferenceController],
  providers: [UserPreferenceService],
})
export class UserPreferenceModule {}
