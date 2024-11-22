import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import { UserNotificationService } from './user-notification.service';
import { CreateUserNotificationDto } from './dtos/create-user-notification.dto';

@Controller('user-notifications')
export class UserNotificationsController {
  constructor(
    private readonly userNotificationService: UserNotificationService,
  ) {}

  @Post()
  async createUserNotification(
    @Body() userNotification: CreateUserNotificationDto,
  ) {
    return this.userNotificationService.create(userNotification);
  }
  // eslint-disable-next-line prettier/prettier

  @Get(':userId/logs')
  async getUserLogs(@Param('userId') userId: string) {
    return this.userNotificationService.getUserLogs(userId);
  }

  @Get('stats')
  async getStats() {
    return this.userNotificationService.getStats();
  }
}
