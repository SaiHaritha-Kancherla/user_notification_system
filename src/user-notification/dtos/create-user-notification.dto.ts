import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsObject } from 'class-validator';

export class CreateUserNotificationDto {
  @ApiProperty({ description: 'Unique ID of the user', example: 'user123' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Type of the notification',
    example: 'marketing',
  })
  @IsEnum(['marketing', 'newsletter', 'updates'])
  notificationType: 'marketing' | 'newsletter' | 'updates';

  @ApiProperty({
    description: 'Message to be sent in the notification',
    example: 'Welcome to our weekly newsletter!',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Additional metadata for the notification',
    example: { urgency: 'high', source: 'admin' },
    required: false,
  })
  @IsObject()
  metadata?: Record<string, any>;
}
