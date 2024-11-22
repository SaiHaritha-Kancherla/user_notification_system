import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum NotificationType {
  marketing = 'marketing',
  newsletter = 'newsletter',
  updates = 'updates',
}

export enum NotificationChannel {
  email = 'email',
  sms = 'sms',
  push = 'push',
}

export enum NotificationStatus {
  pending = 'pending',
  sent = 'sent',
  failed = 'failed',
}

@Schema({ timestamps: true })
export class UserNotificationLog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: NotificationType;

  @Prop({ required: true })
  channel: NotificationChannel;

  @Prop({ required: true })
  status: NotificationStatus;

  @Prop()
  sentAt?: Date;

  @Prop()
  failureReason?: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const UserNotificationLogSchema =
  SchemaFactory.createForClass(UserNotificationLog);
