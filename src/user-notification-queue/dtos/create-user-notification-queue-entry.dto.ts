import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { FrequencyOptions } from '../../user-preference/user-preference.schema';

export class CreateUserNotificationQueueEntryDto {
  @ApiProperty({ description: 'Unique ID of the user', example: 'user123' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'User Prefferred Notification Frequency',
    example: 'weekly | daily | never | monthly',
  })
  @IsEnum(['daily', 'weekly', 'monthly', 'never'])
  frequency: FrequencyOptions;
}
