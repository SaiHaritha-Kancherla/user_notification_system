import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferenceService } from './user-preference.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference, FrequencyOptions } from './user-preference.schema';
import { UserNotificationQueueService } from '../user-notification-queue/user-notification-queue.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dtos/update-user-preference.dto';

// Mock the necessary services and models
const mockUserPreferenceModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

const mockUserNotificationQueueService = {
  create: jest.fn(),
  delete: jest.fn(),
};

describe('UserPreferenceService', () => {
  let service: UserPreferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferenceService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: mockUserPreferenceModel,
        },
        {
          provide: UserNotificationQueueService,
          useValue: mockUserNotificationQueueService,
        },
      ],
    }).compile();

    service = module.get<UserPreferenceService>(UserPreferenceService);
  });

  describe('create', () => {
    it('should throw an error if user preference creation fails', async () => {
      const createUserPreferenceDto: CreateUserPreferenceDto = {
        userId: 'user123',
        email: 'test@example.com',
        preferences: {
          marketing: true,
          newsletter: false,
          updates: true,
          frequency: FrequencyOptions.daily,
          channels: {
            email: true,
            sms: false,
            push: true,
          },
        },
        timezone: 'America/New_York',
      };

      mockUserPreferenceModel.create.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.create(createUserPreferenceDto)).rejects.toThrow(
        'There was an error while saving user preferences.',
      );
    });

    it('should save user preferences and create notification queue entry', async () => {
      const createUserPreferenceDto: CreateUserPreferenceDto = {
        userId: 'user123',
        email: 'test@example.com',
        preferences: {
          marketing: true,
          newsletter: false,
          updates: true,
          frequency: FrequencyOptions.daily,
          channels: {
            email: true,
            sms: false,
            push: true,
          },
        },
        timezone: 'America/New_York',
      };

      mockUserPreferenceModel.create.mockResolvedValue(createUserPreferenceDto);
      mockUserNotificationQueueService.create.mockResolvedValue(undefined);

      const result = await service.create(createUserPreferenceDto);

      expect(result).toBe('User Preferences have been saved successfully!!!');
      expect(mockUserNotificationQueueService.create).toHaveBeenCalledWith({
        userId: 'user123',
        frequency: FrequencyOptions.daily,
      });
    });
  });

  describe('findPreferenceByUserId', () => {
    it('should throw an error if user preference not found', async () => {
      const userId = 'user123';

      mockUserPreferenceModel.findOne.mockResolvedValue(null);

      await expect(service.findPreferenceByUserId(userId)).rejects.toThrow(
        new NotFoundException(`User preference with ID ${userId} not found.`),
      );
    });

    it('should return user preference if found', async () => {
      const userId = 'user123';
      const userPreference = {
        userId: 'user123',
        email: 'test@example.com',
        preferences: {
          marketing: true,
          newsletter: true,
          updates: true,
          frequency: FrequencyOptions.daily,
          channels: { email: true, sms: true, push: true },
        },
        timezone: 'America/New_York',
      };

      mockUserPreferenceModel.findOne.mockResolvedValue(userPreference);

      const result = await service.findPreferenceByUserId(userId);

      expect(result).toEqual(userPreference);
    });
  });

  describe('update', () => {
    it('should throw an error if user preference not found for update', async () => {
      const userId = 'user123';
      const updateUserPreferenceDto: UpdateUserPreferenceDto = {
        email: 'updated@example.com',
      };

      mockUserPreferenceModel.findOneAndUpdate.mockResolvedValue(null);

      await expect(
        service.update(userId, updateUserPreferenceDto),
      ).rejects.toThrow(
        new NotFoundException(`User preference with ID ${userId} not found.`),
      );
    });

    it('should update user preference successfully', async () => {
      const userId = 'user123';
      const updateUserPreferenceDto: UpdateUserPreferenceDto = {
        email: 'updated@example.com',
      };

      const updatedUserPreference = {
        userId: 'user123',
        email: 'updated@example.com',
        preferences: {
          marketing: true,
          newsletter: true,
          updates: true,
          frequency: FrequencyOptions.daily,
          channels: { email: true, sms: true, push: true },
        },
        timezone: 'America/New_York',
      };

      mockUserPreferenceModel.findOneAndUpdate.mockResolvedValue(
        updatedUserPreference,
      );

      const result = await service.update(userId, updateUserPreferenceDto);

      expect(result).toEqual(updatedUserPreference);
    });
  });

  describe('delete', () => {
    it('should delete user preference and notification queue entry', async () => {
      const userId = 'user123';

      // Mocking the delete method in the notification queue service
      mockUserNotificationQueueService.delete.mockResolvedValue(
        `User notification queue for ${userId} has been deleted successfully`,
      );

      // Mocking the deletion of the user preference
      mockUserPreferenceModel.findOneAndDelete.mockResolvedValue({ userId });

      // Call the delete method
      const result = await service.delete(userId);

      // Check that delete was called with the correct userId in both services
      expect(mockUserNotificationQueueService.delete).toHaveBeenCalledWith(
        userId,
      );
      expect(mockUserPreferenceModel.findOneAndDelete).toHaveBeenCalledWith({
        userId,
      });

      // Ensure the result message is correct
      expect(result).toEqual({
        message: `User preference with ID ${userId} and notification queue have been successfully deleted.`,
      });
    });
  });
});
