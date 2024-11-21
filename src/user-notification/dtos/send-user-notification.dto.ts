import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsObject, IsString } from 'class-validator';

export class SendUserNotificationDto {
  @ApiProperty({
    description: 'Unique ID of the user',
    example: 'user123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Type of the notification to be sent',
    example: 'marketing',
  })
  @IsEnum(['marketing', 'newsletter', 'updates'])
  notificationType: 'marketing' | 'newsletter' | 'updates';

  @ApiProperty({
    description: 'Delivery channel for the notification',
    example: 'email',
  })
  @IsEnum(['email', 'sms', 'push'])
  channel: 'email' | 'sms' | 'push';

  @ApiProperty({
    description: 'Message content of the notification',
    example: 'Welcome to our newsletter!',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Optional metadata for additional notification details',
    example: { urgency: 'high', campaignId: 'campaign123' },
    required: false,
  })
  @IsObject()
  metadata?: Record<string, any>;
}
