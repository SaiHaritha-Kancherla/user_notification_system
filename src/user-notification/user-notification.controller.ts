import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UserNotificationService } from './user-notification.service';
import { UserNotificationDto } from './dtos/user-notification.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('User Notifications') // This will group all endpoints under the 'User Notifications' section
@UseGuards(ThrottlerGuard)
@Controller('/api/notifications/')
export class UserNotificationsController {
  constructor(
    private readonly userNotificationService: UserNotificationService,
  ) {}

  @Throttle({ short: { limit: 3, ttl: 60000 } })
  @Post('send')
  @ApiOperation({ summary: 'Send a user notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createUserNotification(@Body() userNotification: UserNotificationDto) {
    return this.userNotificationService.create(userNotification);
  }

  @Throttle({ long: { limit: 3, ttl: 60 } })
  @Get(':userId/logs')
  @ApiOperation({ summary: 'Get user notification logs by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'Unique ID of the user',
    example: 'user123',
  })
  @ApiResponse({
    status: 200,
    description: 'User logs retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserLogs(@Param('userId') userId: string) {
    return this.userNotificationService.getUserLogs(userId);
  }

  @Throttle({ short: { limit: 3, ttl: 60000 } })
  @Get('stats')
  @ApiOperation({ summary: 'Get statistics of notifications' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Type of notification to filter by',
    example: 'marketing',
  })
  @ApiQuery({
    name: 'channel',
    required: false,
    description: 'Notification channel (e.g., email, sms)',
    example: 'email',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date to filter statistics (format: YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date to filter statistics (format: YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async getStats(
    @Query('type') type?: string,
    @Query('channel') channel?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.userNotificationService.getStats({
      type,
      channel,
      startDate,
      endDate,
    });
  }
}
