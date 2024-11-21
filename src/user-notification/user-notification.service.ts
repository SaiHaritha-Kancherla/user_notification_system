import { Injectable } from '@nestjs/common';

@Injectable()
export class UserNotificationService {
  async send(sendNotificationDto: any) {
    // Simulate sending notification
    return { success: true, data: sendNotificationDto };
  }

  async getLogs(userId: string) {
    return { logs: [] }; // Placeholder
  }

  async getStats() {
    return { totalSent: 100 }; // Placeholder
  }
}
