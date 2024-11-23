import { Injectable, NotFoundException } from '@nestjs/common';
import {
  NotificationChannel,
  NotificationType,
} from './user-notification/user-notification.schema';
import { FrequencyOptions } from './user-preference/user-preference.schema';
import { UserNotificationQueueService } from './user-notification-queue/user-notification-queue.service';
import { UserPreferenceService } from './user-preference/user-preference.service';
import { CreateUserPreferenceDto } from './user-preference/dtos/create-user-preference.dto';
import { UserNotificationService } from './user-notification/user-notification.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly userNotificationQueueService: UserNotificationQueueService,
    private readonly userPreferenceService: UserPreferenceService,
    private readonly userNotificationService: UserNotificationService,
  ) {}
  @Cron('0 0 0 * * *') // every day at 12 AM
  async handleNotificationQueueDaily() {
    try {
      const dailyUserNotifications =
        await this.userNotificationQueueService.fetchAllUsersinQueueByFrequency(
          FrequencyOptions.daily,
        );
      dailyUserNotifications.forEach(async (userFrequencyEntry) => {
        const userPreference: CreateUserPreferenceDto =
          await this.userPreferenceService.findPreferenceByUserId(
            userFrequencyEntry.userId,
          );

        for (const notificationType of Object.values(NotificationType)) {
          if (userPreference.preferences[notificationType]) {
            for (const notificationChannel of Object.values(
              NotificationChannel,
            )) {
              if (userPreference.preferences.channels[notificationChannel]) {
                this.userNotificationService.sendNotification(
                  userFrequencyEntry.userId,
                  notificationType,
                  notificationChannel,
                  FrequencyOptions.daily,
                );
              }
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error(`User preference not found : ${error.message}`);
      } else {
        console.error(
          `An error occurred while processing notification send request : ${error.message}`,
        );
      }
    }
  }

  @Cron('0 0 0 * * 0') // every week on Sunday 12 AM
  async handleNotificationQueueWeekly() {
    try {
      const dailyUserNotifications =
        await this.userNotificationQueueService.fetchAllUsersinQueueByFrequency(
          FrequencyOptions.weekly,
        );
      dailyUserNotifications.forEach(async (userFrequencyEntry) => {
        const userPreference: CreateUserPreferenceDto =
          await this.userPreferenceService.findPreferenceByUserId(
            userFrequencyEntry.userId,
          );

        for (const notificationType of Object.values(NotificationType)) {
          if (userPreference.preferences[notificationType]) {
            for (const notificationChannel of Object.values(
              NotificationChannel,
            )) {
              if (userPreference.preferences.channels[notificationChannel]) {
                this.userNotificationService.sendNotification(
                  userFrequencyEntry.userId,
                  notificationType,
                  notificationChannel,
                  FrequencyOptions.weekly,
                );
              }
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error(`User preference not found : ${error.message}`);
      } else {
        console.error(
          `An error occurred while processing notification send request : ${error.message}`,
        );
      }
    }
  }

  @Cron('0 0 0 1 * *') // lets change this after to weekly monthly anol
  async handleNotificationQueueMonthly() {
    try {
      const dailyUserNotifications =
        await this.userNotificationQueueService.fetchAllUsersinQueueByFrequency(
          FrequencyOptions.monthly,
        );
      dailyUserNotifications.forEach(async (userFrequencyEntry) => {
        const userPreference: CreateUserPreferenceDto =
          await this.userPreferenceService.findPreferenceByUserId(
            userFrequencyEntry.userId,
          );

        for (const notificationType of Object.values(NotificationType)) {
          if (userPreference.preferences[notificationType]) {
            for (const notificationChannel of Object.values(
              NotificationChannel,
            )) {
              if (userPreference.preferences.channels[notificationChannel]) {
                this.userNotificationService.sendNotification(
                  userFrequencyEntry.userId,
                  notificationType,
                  notificationChannel,
                  FrequencyOptions.monthly,
                );
              }
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error(`User preference not found : ${error.message}`);
      } else {
        console.error(
          `An error occurred while processing notification send request : ${error.message}`,
        );
      }
    }
  }
}
