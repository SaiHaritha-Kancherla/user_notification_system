import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FrequencyOptions,
  UserPreference,
} from 'src/user-preference/user-preference.schema';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dtos/update-user-preference.dto';
import { CreateUserNotificationQueueEntryDto } from 'src/user-notification-queue/dtos/create-user-notification-queue-entry.dto';
import { UserNotificationQueueService } from 'src/user-notification-queue/user-notification-queue.service';
@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectModel(UserPreference.name)
    private readonly userPreferenceModel: Model<UserPreference>,
    private readonly userNotificationQueueService: UserNotificationQueueService,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto) {
    //for each notification type which was selected by user, add an entry into
    // UserNotificationModel as well against that notification type
    const createdUserPreference = await this.userPreferenceModel.create(
      createUserPreferenceDto,
    );
    if (
      createdUserPreference.preferences.frequency !== FrequencyOptions.never
    ) {
      const notificationQueueEntry: CreateUserNotificationQueueEntryDto = {
        userId: createdUserPreference.userId,
        frequency: createdUserPreference.preferences.frequency,
      };
      this.userNotificationQueueService.create(notificationQueueEntry);
    }
    return 'User Preferences have been saved successfully!!!';
  }

  async findByUserId(userId: string) {
    return this.userPreferenceModel.findOne({ userId });
  }

  async update(
    userId: string,
    updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.userPreferenceModel.findOneAndUpdate(
      { userId },
      updateUserPreferenceDto,
      { new: true },
    );
  }

  async delete(userId: string) {
    return this.userPreferenceModel.findOneAndDelete({ userId });
  }
}
