import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationChannel,
  NotificationStatus,
  NotificationType,
  UserNotificationLog,
} from './user-notification.schema';
import { Model } from 'mongoose';
import { CreateUserNotificationDto } from './dtos/create-user-notification.dto';
import { FrequencyOptions } from 'src/user-preference/user-preference.schema';

@Injectable()
export class UserNotificationService {
  constructor(
    @InjectModel(UserNotificationLog.name)
    private readonly userNotificationLogModel: Model<UserNotificationLog>,
  ) {}
  async send(sendNotificationDto: any) {
    // Simulate sending notification
    return { success: true, data: sendNotificationDto };
  }

  async getUserLogs(userId: string) {
    return this.userNotificationLogModel.find({ userId }).exec();
  }

  async getStats() {
    return { totalSent: 100 }; // Placeholder
  }

  async create(createUserNotificationDto: CreateUserNotificationDto) {
    return this.userNotificationLogModel.create(createUserNotificationDto);
  }

  async sendNotification(
    userId: string,
    notificationType: NotificationType,
    notificationChannel: NotificationChannel,
    frequency: FrequencyOptions,
  ) {
    let notificationStatus: NotificationStatus = NotificationStatus['sent'];
    let notificationFailedReason = null;
    let notificationMessage = null;
    try {
      switch (notificationChannel) {
        case 'sms':
          notificationMessage = await this.sendSMSNotification(
            userId,
            notificationType,
            frequency,
          );
          break;
        case 'push':
          notificationMessage = await this.senPushNotification(
            userId,
            notificationType,
            frequency,
          );
          break;
        case 'email':
          notificationMessage = await this.sendEmailNotification(
            userId,
            notificationType,
            frequency,
          );
          break;
        default:
          throw new HttpException('In valid Notification Channel', 500);
      }
    } catch (error) {
      notificationStatus = NotificationStatus['failed'];
      notificationFailedReason = error;
      notificationMessage = 'Error Occurred in Notifying';
    } finally {
      const notificationLog: CreateUserNotificationDto = {
        userId: userId,
        type: notificationType,
        channel: notificationChannel,
        status: notificationStatus,
        message: notificationMessage,
        sentAt: new Date(),
        failureReason: notificationFailedReason,
        metadata: {},
      };
      this.create(notificationLog);
    }
  }

  async sendSMSNotification(
    userId: string,
    notificationType: NotificationType,
    frequency: FrequencyOptions,
  ) {
    console.log(frequency, notificationType, ' SMS Notification for ', userId);
    return frequency + ' ' + notificationType + ' Notification ';
  }

  async senPushNotification(
    userId: string,
    notificationType: NotificationType,
    frequency: FrequencyOptions,
  ) {
    console.log(frequency, notificationType, ' Push Notification for ', userId);
    return frequency + ' ' + notificationType + ' Notification ';
  }

  async sendEmailNotification(
    userId: string,
    notificationType: NotificationType,
    frequency: FrequencyOptions,
  ) {
    console.log(
      frequency,
      notificationType,
      ' Email Notification for ',
      userId,
    );
    return frequency + ' ' + notificationType + ' Notification ';
  }
}
