import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from 'src/schemas/user-preference.schema';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dtos/update-user-preference.dto';
@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectModel(UserPreference.name)
    private readonly preferenceModel: Model<UserPreference>,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.preferenceModel.create(createUserPreferenceDto);
  }

  async findOne(userId: string) {
    return this.preferenceModel.findOne({ userId });
  }

  async update(
    userId: string,
    updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.preferenceModel.findOneAndUpdate(
      { userId },
      updateUserPreferenceDto,
      { new: true },
    );
  }

  async delete(userId: string) {
    return this.preferenceModel.findOneAndDelete({ userId });
  }
}
