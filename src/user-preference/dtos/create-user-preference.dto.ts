import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString } from 'class-validator';
import { FrequencyOptions } from '../user-preference.schema';

export class CreateUserPreferenceDto {
  @ApiProperty({ description: 'Unique ID of the user', example: 'user123' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Preferences for notifications',
    example: {
      marketing: true,
      newsletter: false,
      updates: true,
      frequency: 'weekly',
      channels: { email: true, sms: false, push: true },
    },
  })
  @IsObject()
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: FrequencyOptions;
    channels: { email: boolean; sms: boolean; push: boolean };
  };

  @ApiProperty({
    description: 'Timezone of the user',
    example: 'America/New_York',
  })
  @IsString()
  timezone: string;
}
