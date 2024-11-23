import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotificationQueue } from './user-notification-queue.schema';
import { CreateUserNotificationQueueEntryDto } from './dtos/create-user-notification-queue-entry.dto';

@Injectable()
export class UserNotificationQueueService {
  constructor(
    @InjectModel(UserNotificationQueue.name)
    private readonly userNotificationQueueModel: Model<UserNotificationQueue>,
  ) {}

  async create(
    createUserNotificationQueueEntryDto: CreateUserNotificationQueueEntryDto,
  ) {
    return this.userNotificationQueueModel.create(
      createUserNotificationQueueEntryDto,
    );
  }

  async fetchAllUsersinQueueByFrequency(frequency: string) {
    return this.userNotificationQueueModel
      .find({ frequency: frequency })
      .exec();
  }

  async delete(userId: string): Promise<string> {
    const deletedUserNotificationEntry =
      await this.userNotificationQueueModel.findOneAndDelete({
        userId,
      });
    if (!deletedUserNotificationEntry) {
      return `User notification queue for ${userId} not found`;
    }
    return `User notification queue for ${userId} has been deleted successfully`;
  }
}
