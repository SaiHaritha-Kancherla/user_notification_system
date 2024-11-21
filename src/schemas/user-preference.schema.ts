import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum FrequencyOptions {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Never = 'never',
}
@Schema({ timestamps: true })
export class UserPreference extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Object, required: true })
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: FrequencyOptions;
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @Prop({ required: true })
  timezone: string;
}

export const UserPreferenceSchema =
  SchemaFactory.createForClass(UserPreference);
