import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { IdGeneratorModule } from '../../../libs/id-generator/src/id-generator.module';
import { UserModelInstance } from './infrastructure/database/models';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { UsersService } from './infrastructure/database/services/users.service';
import { PasswordService } from './application/services/password.service';
import { UsersController } from './infrastructure/http/controllers/users.controller';
import { ListUsersUseCase } from './application/use-cases/list-users/list-users.use-case';
import { UpdateUserProfileUseCase } from './application/use-cases/update-user-profile/update-user-profile.use-case';

@Module({
  imports: [MongooseModule.forFeature([UserModelInstance]), IdGeneratorModule],
  providers: [
    UserRepository,
    UsersService,
    PasswordService,
    ListUsersUseCase,
    UpdateUserProfileUseCase,
  ],
  controllers: [UsersController],
  exports: [UsersService, UpdateUserProfileUseCase],
})
export class UsersModule {}
