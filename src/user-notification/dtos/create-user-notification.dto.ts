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

export class CreateUserNotificationDto {
  @ApiProperty({ description: 'Unique ID of the user', example: 'user123' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Type of the notification',
    example: 'marketing | newsletter | updates',
  })
  @IsEnum(['marketing', 'newsletter', 'updates'])
  type: NotificationType;

  @ApiProperty({
    description: 'Channel of the notification',
    example: 'email | sms | push',
  })
  channel: NotificationChannel;
  // eslint-disable-next-line prettier/prettier

  @ApiProperty({
    description: 'Notification Status',
    example: 'sent | pending | failed',
  })
  @IsEnum(['sent', 'pending', 'failed'])
  status: NotificationStatus;

  @ApiProperty({
    description: 'Message to be sent in the notification',
    example: 'Welcome to our weekly newsletter!',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The date and time the message was sent',
    example: '2024-11-22T10:30:00Z', // ISO 8601 format
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sentAt?: Date;

  @ApiProperty({
    description: 'Additional metadata for the notification',
    example: { urgency: 'high', source: 'admin' },
    required: false,
  })
  @IsOptional()
  @IsString()
  failureReason?: string;

  @ApiProperty({
    description: 'Additional metadata for the notification',
    example: { urgency: 'high', source: 'admin' },
    required: false,
  })
  @IsObject()
  metadata?: Record<string, any>;
}
