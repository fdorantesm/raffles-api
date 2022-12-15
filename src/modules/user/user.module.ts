import { Module } from '@nestjs/common';

import { ChallengeModule } from '../challenges/challenge.module';
import { UsersModule } from './../users/users.module';
import { GetRegistrationByUuidUseCase } from './application/use-cases/get-registration-by-uuid.use-case';
import { UserController } from './infrastructure/http/controllers/user.controller';

@Module({
  imports: [UsersModule, ChallengeModule],
  providers: [GetRegistrationByUuidUseCase],
  controllers: [UserController],
})
export class UserModule {}
