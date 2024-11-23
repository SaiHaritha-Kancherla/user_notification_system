import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationChannel,
  NotificationStatus,
  NotificationType,
  UserNotificationLog,
} from './user-notification.schema';
import { Model } from 'mongoose';
import { UserNotificationDto } from './dtos/user-notification.dto';
import { FrequencyOptions } from '../user-preference/user-preference.schema';
import { plainToInstance } from 'class-transformer';

interface StatsQuery {
  type?: string;
  channel?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class UserNotificationService {
  constructor(
    @InjectModel(UserNotificationLog.name)
    private readonly userNotificationLogModel: Model<UserNotificationLog>,
  ) {}

  async getUserLogs(userId: string) {
    const userNotificationLogs = await this.userNotificationLogModel
      .find({ userId })
      .exec();
    const userNotificationLogsDTO = plainToInstance(
      UserNotificationDto,
      userNotificationLogs,
      {
        excludeExtraneousValues: true,
      },
    );
    return { status: true, data: userNotificationLogsDTO };
  }

  async getStats(query: StatsQuery) {
    const filter: any = {};

    if (query.type) filter.type = query.type;
    if (query.channel) filter.channel = query.channel;
    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
      if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
    }

    const totalNotifications =
      await this.userNotificationLogModel.countDocuments(filter);
    const successfulNotifications =
      await this.userNotificationLogModel.countDocuments({
        ...filter,
        status: 'SENT',
      });
    const failedNotifications = totalNotifications - successfulNotifications;

    const breakdownByType = await this.userNotificationLogModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$type',
          total: { $sum: 1 },
          success: { $sum: { $cond: [{ $eq: ['$status', 'SENT'] }, 1, 0] } },
        },
      },
    ]);

    const breakdownByChannel = await this.userNotificationLogModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$channel',
          total: { $sum: 1 },
          success: { $sum: { $cond: [{ $eq: ['$status', 'SENT'] }, 1, 0] } },
        },
      },
    ]);

    return {
      totalNotifications,
      successfulNotifications,
      failedNotifications,
      successRate: (
        (successfulNotifications / totalNotifications) *
        100
      ).toFixed(2),
      breakdownByType,
      breakdownByChannel,
    };
  }

  async create(createUserNotificationDto: UserNotificationDto) {
    try {
      // Attempt to create a new user notification log
      const createdUserNotification =
        await this.userNotificationLogModel.create(createUserNotificationDto);

      // Return the created notification log if successful
      return createdUserNotification;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error while creating user notification log:', error);

      // Optionally, throw a custom error to provide a specific response
      throw new Error(
        'There was an error while creating the user notification log.',
      );
    }
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
      const notificationLog: UserNotificationDto = {
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
