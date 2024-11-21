import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserNotificationModule } from './user-notification/user-notification.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { Controller } from './user-notification.controller.ts/user-nofification/.controller';
import { UserNotificationModule } from './schemas/user-notification.module';

@Module({
  imports: [UserNotificationModule, UserPreferenceModule],
  controllers: [AppController, Controller],
  providers: [AppService],
})
export class AppModule {}
