import {
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { UserPreferenceService } from './user-preference.service';
import { UpdateUserPreferenceDto } from './dtos/update-user-preference.dto';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('User Preferences') // Grouping under 'User Preferences'
@UseGuards(ThrottlerGuard)
@Controller('/api/preferences/')
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @Throttle({ short: { limit: 3, ttl: 60 } })
  @Post()
  @ApiOperation({ summary: 'Create user preferences' })
  @ApiResponse({
    status: 201,
    description: 'User preferences created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createUserPreference(
    @Body() createUserPreferenceDto: CreateUserPreferenceDto,
  ) {
    return this.userPreferenceService.create(createUserPreferenceDto);
  }

  @Throttle({ short: { limit: 3, ttl: 60000 } })
  @Get(':userId')
  @ApiOperation({ summary: 'Get user preferences by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'Unique ID of the user',
    example: 'user123',
  })
  @ApiResponse({
    status: 200,
    description: 'User preferences retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(@Param('userId') userId: string) {
    return this.userPreferenceService.findPreferenceByUserId(userId);
  }

  @Throttle({ short: { limit: 3, ttl: 60 } })
  @Patch(':userId')
  @ApiOperation({ summary: 'Update user preferences by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'Unique ID of the user',
    example: 'user123',
  })
  @ApiResponse({
    status: 200,
    description: 'User preferences updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async update(
    @Param('userId') userId: string,
    @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.userPreferenceService.update(userId, updateUserPreferenceDto);
  }

  @Throttle({ short: { limit: 3, ttl: 60 } })
  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user preferences by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'Unique ID of the user',
    example: 'user123',
  })
  @ApiResponse({
    status: 200,
    description: 'User preferences deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async delete(@Param('userId') userId: string) {
    return this.userPreferenceService.delete(userId);
  }
}
