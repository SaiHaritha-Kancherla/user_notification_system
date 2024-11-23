import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsObject,
  IsOptional,
  IsDateString,
} from 'class-validator';
import {
  NotificationChannel,
  NotificationStatus,
  NotificationType,
} from '../user-notification.schema';
import { Expose } from 'class-transformer';

export class UserNotificationDto {
  @ApiProperty({ description: 'Unique ID of the user', example: 'user123' })
  @IsString()
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Type of the notification',
    example: 'marketing | newsletter | updates',
  })
  @Expose()
  @IsEnum(['marketing', 'newsletter', 'updates'])
  type: NotificationType;

  @ApiProperty({
    description: 'Channel of the notification',
    example: 'email | sms | push',
  })
  @Expose()
  channel: NotificationChannel;
  // eslint-disable-next-line prettier/prettier

  @ApiProperty({
    description: 'Notification Status',
    example: 'sent | pending | failed',
  })
  @Expose()
  @IsEnum(['sent', 'pending', 'failed'])
  status: NotificationStatus;

  @ApiProperty({
    description: 'Message to be sent in the notification',
    example: 'Welcome to our weekly newsletter!',
  })
  @Expose()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The date and time the message was sent',
    example: '2024-11-22T10:30:00Z', // ISO 8601 format
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsDateString()
  sentAt?: Date;

  @ApiProperty({
    description: 'Additional metadata for the notification',
    example: { urgency: 'high', source: 'admin' },
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  failureReason?: string;

  @ApiProperty({
    description: 'Additional metadata for the notification',
    example: { urgency: 'high', source: 'admin' },
    required: false,
  })
  @Expose()
  @IsObject()
  metadata?: Record<string, any>;
}
