/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserNotificationQueueService } from './user-notification-queue.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserNotificationQueue } from './user-notification-queue.schema';
import { CreateUserNotificationQueueEntryDto } from './dtos/create-user-notification-queue-entry.dto';
import { Model } from 'mongoose';
import { FrequencyOptions } from '../user-preference/user-preference.schema';

// Mock the Mongoose model
const mockUserNotificationQueueModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOneAndDelete: jest.fn(),
};

describe('UserNotificationQueueService', () => {
  let service: UserNotificationQueueService;
  let model: Model<UserNotificationQueue>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserNotificationQueueService,
        {
          provide: getModelToken(UserNotificationQueue.name),
          useValue: mockUserNotificationQueueModel,
        },
      ],
    }).compile();

    service = module.get<UserNotificationQueueService>(
      UserNotificationQueueService,
    );
    model = module.get<Model<UserNotificationQueue>>(
      getModelToken(UserNotificationQueue.name),
    );
  });

  describe('create', () => {
    it('should create a new user notification queue entry successfully', async () => {
      const createUserNotificationQueueEntryDto: CreateUserNotificationQueueEntryDto =
        {
          userId: 'user123',
          frequency: FrequencyOptions.daily,
        };

      const savedEntry = {
        ...createUserNotificationQueueEntryDto,
        _id: 'someId',
      };

      mockUserNotificationQueueModel.create.mockResolvedValue(savedEntry);

      const result = await service.create(createUserNotificationQueueEntryDto);

      expect(result).toEqual(savedEntry);
      expect(mockUserNotificationQueueModel.create).toHaveBeenCalledWith(
        createUserNotificationQueueEntryDto,
      );
    });

    it('should throw an error if creating the queue entry fails', async () => {
      const createUserNotificationQueueEntryDto: CreateUserNotificationQueueEntryDto =
        {
          userId: 'user123',
          frequency: FrequencyOptions.daily,
        };

      mockUserNotificationQueueModel.create.mockRejectedValue(
        new Error('Error creating queue entry'),
      );

      await expect(
        service.create(createUserNotificationQueueEntryDto),
      ).rejects.toThrow('Error creating queue entry');
    });
  });

  describe('delete', () => {
    it('should delete a user notification queue entry successfully', async () => {
      const userId = 'user123';

      // Mock successful deletion
      mockUserNotificationQueueModel.findOneAndDelete.mockResolvedValue({
        userId,
      });

      const result = await service.delete(userId);

      expect(result).toBe(
        `User notification queue for ${userId} has been deleted successfully`,
      );
      expect(
        mockUserNotificationQueueModel.findOneAndDelete,
      ).toHaveBeenCalledWith({
        userId,
      });
    });

    it('should not throw an error if the user notification queue entry is not found', async () => {
      const userId = 'user123';

      // Mock when the user notification queue entry is not found
      mockUserNotificationQueueModel.findOneAndDelete.mockResolvedValue(null);

      const result = await service.delete(userId);

      expect(result).toBe(`User notification queue for ${userId} not found`);
      expect(
        mockUserNotificationQueueModel.findOneAndDelete,
      ).toHaveBeenCalledWith({
        userId,
      });
    });
  });
});
