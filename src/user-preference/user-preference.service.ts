/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FrequencyOptions, UserPreference } from './user-preference.schema';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dtos/update-user-preference.dto';
import { CreateUserNotificationQueueEntryDto } from '../user-notification-queue/dtos/create-user-notification-queue-entry.dto';
import { UserNotificationQueueService } from '../user-notification-queue/user-notification-queue.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectModel(UserPreference.name)
    private readonly userPreferenceModel: Model<UserPreference>,
    private readonly userNotificationQueueService: UserNotificationQueueService,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto) {
    try {
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

        await this.userNotificationQueueService.create(notificationQueueEntry);
      }
      return 'User Preferences have been saved successfully!!!';
    } catch (error) {
      throw new Error('There was an error while saving user preferences.');
    }
  }

  async findPreferenceByUserId(userId: string) {
    const userPreference = await this.userPreferenceModel.findOne({ userId });

    if (!userPreference) {
      throw new NotFoundException(
        `User preference with ID ${userId} not found.`,
      );
    }
    return userPreference;
  }
  async update(
    userId: string,
    updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    const updatedUserPreference =
      await this.userPreferenceModel.findOneAndUpdate(
        { userId },
        updateUserPreferenceDto,
        { new: true },
      );

    if (!updatedUserPreference) {
      throw new NotFoundException(
        `User preference with ID ${userId} not found.`,
      );
    }

    return updatedUserPreference;
  }

  async delete(userId: string) {
    // Delete the user preference
    const deletedUserPreference =
      await this.userPreferenceModel.findOneAndDelete({ userId });

    if (!deletedUserPreference) {
      throw new NotFoundException(
        `User preference with ID ${userId} not found.`,
      );
    }

    // Also delete the notification queue entry if exists
    await this.userNotificationQueueService.delete(userId);

    return {
      message: `User preference with ID ${userId} and notification queue have been successfully deleted.`,
    };
  }
}
