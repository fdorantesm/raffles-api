import { Module } from '@nestjs/common';

import { CoreModule } from '../../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { ChallengeModule } from '../challenges/challenge.module';
import { HealthModule } from '../health/health.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { UsersModule } from '../users/users.module';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    HealthModule,
    AuthModule,
    ChallengeModule,
    VideosModule,
    UsersModule,
    UserModule,
  ],
})
export class AppModule {}
