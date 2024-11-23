import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FrequencyOptions } from '../user-preference.schema';

class NotificationChannelsDto {
  @ApiProperty({ description: 'Email notifications enabled', example: true })
  @IsOptional()
  @IsBoolean()
  email: boolean;

  @ApiProperty({ description: 'SMS notifications enabled', example: false })
  @IsOptional()
  @IsBoolean()
  sms: boolean;

  @ApiProperty({ description: 'Push notifications enabled', example: true })
  @IsOptional()
  @IsBoolean()
  push: boolean;
}

class PreferencesDto {
  @ApiProperty({
    description: 'Marketing notifications enabled',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  marketing: boolean;

  @ApiProperty({
    description: 'Newsletter notifications enabled',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  newsletter: boolean;

  @ApiProperty({ description: 'Update notifications enabled', example: true })
  @IsOptional()
  @IsBoolean()
  updates: boolean;

  @ApiProperty({
    description: 'Frequency of notifications',
    example: 'weekly',
    enum: FrequencyOptions,
  })
  @IsOptional()
  @IsEnum(FrequencyOptions)
  frequency: FrequencyOptions;

  @ApiProperty({
    description: 'Channels for notifications',
    type: NotificationChannelsDto,
  })
  @ValidateNested()
  @Type(() => NotificationChannelsDto)
  channels: NotificationChannelsDto;
}

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
    type: PreferencesDto,
  })
  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences: PreferencesDto;

  @ApiProperty({
    description: 'Timezone of the user',
    example: 'America/New_York',
  })
  @IsString()
  timezone: string;
}
