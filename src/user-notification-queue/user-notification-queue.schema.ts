import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FrequencyOptions } from '../user-preference/user-preference.schema';

@Schema({ timestamps: true })
export class UserNotificationQueue extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  frequency: FrequencyOptions;
}

export const UserNotificationQueueSchema = SchemaFactory.createForClass(
  UserNotificationQueue,
);
