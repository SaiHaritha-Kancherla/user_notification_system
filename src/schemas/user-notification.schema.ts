import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum NotificationType {
  Marketing = 'marketing',
  Newsletter = 'newsletter',
  Updates = 'updates',
}

export enum NotificationChannel {
  Email = 'email',
  Sms = 'sms',
  Push = 'push',
}

export enum NotificationStatus {
  Pending = 'pending',
  Sent = 'sent',
  Failed = 'failed',
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
