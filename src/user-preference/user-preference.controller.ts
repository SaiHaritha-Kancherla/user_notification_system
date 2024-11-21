import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UpdateUserPreferenceDto } from './dtos/update-user-preference.dto';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';

@Controller('user-preferences')
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @Post()
  async create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.userPreferenceService.create(createUserPreferenceDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.userPreferenceService.findOne(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.userPreferenceService.update(userId, updateUserPreferenceDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return this.userPreferenceService.delete(userId);
  }
}
