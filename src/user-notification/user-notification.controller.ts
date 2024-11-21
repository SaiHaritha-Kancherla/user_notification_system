import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import { UserNotificationService } from './user-notification.service';
import { SendUserNotificationDto } from './dtos/send-user-notification.dto';

@Controller('user-notifications')
export class NotificationsController {
  constructor(
    private readonly userNotificationService: UserNotificationService,
  ) {}

  @Post('send')
  async send(@Body() sendUserNotificationDto: SendUserNotificationDto) {
    return this.userNotificationService.send(sendUserNotificationDto);
  }

  @Get(':userId/logs')
  async getLogs(@Param('userId') userId: string) {
    return this.userNotificationService.getLogs(userId);
  }

  @Get('stats')
  async getStats() {
    return this.userNotificationService.getStats();
  }
}
