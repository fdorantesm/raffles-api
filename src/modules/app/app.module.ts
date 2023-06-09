import { Module } from '@nestjs/common';

import { CoreModule } from '../../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { CartModule } from '../cart/cart.module';
import { HealthModule } from '../health/health.module';
import { RafflesModule } from '../raffles/raffles.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    HealthModule,
    AuthModule,
    UsersModule,
    RafflesModule,
    CartModule,
  ],
})
export class AppModule {}
