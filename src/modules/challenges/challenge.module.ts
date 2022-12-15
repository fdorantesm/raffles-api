import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { VideosModule } from '../videos/videos.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationsRepository } from './infrastructure/database/repositories/registrations.repository';
import { IdGeneratorModule } from './../../../libs/id-generator/src/id-generator.module';
import { ChallengeModelInstance } from './infrastructure/database/models/challenge.model';
import { ChallengesController } from './infrastructure/http/controllers/challenges.controller';
import { ChallengesRepository } from './infrastructure/database/repositories/challenges.repository';
import { ChallengesService } from './infrastructure/database/services/challenges.services';
import { CreateChallengeUseCase } from './application/use-cases/create-challenge/create-challenge.use-case';
import { GetChallengeUseCase } from './application/use-cases/get-challenge/get-challenge.use-case';
import { ListChallengesUseCase } from './application/use-cases/list-challenges/list-challenges.use-case';
import { DeleteChallengeUseCase } from './application/use-cases/delete-challenge/delete-challenge.use-case';
import { UpdateChallengeUseCase } from './application/use-cases/update-challenge/update-challenge.use-case';
import { RegistrationModelInstance } from './infrastructure/database/models/registration.model';
import { RegistrationsService } from './infrastructure/database/services/registrations.service';
import { RegistrationsController } from './infrastructure/http/controllers/registrations.controller';
import { SetRegistrationActiveUseCase } from './application/use-cases/set-registration-active/set-registration-active.use-case';
import { SetRegistrationInactiveUseCase } from './application/use-cases/set-registration-inactive/set-registration-inactive.use-case';
import { GetRegistrationUseCase } from './application/use-cases/get-registration/get-registration.use-case';
import { CreateRegistrationUseCase } from './application/use-cases/create-registration/create-registration.use-case';
import { GetChallengePlaylistUseCase } from './application/use-cases/get-challenge-playlist/get-challenge-playlist.use-case';
import { commandHandlers } from './domain/commands';
import { RegisterUserToNextChallengeUseCase } from './application/use-cases/register-user-to-next-challenge/register-user-to-next-challenge.use-case';
import { GetPendingChallengeUseCase } from './application/use-cases/get-pending-challenge/get-pending-challenge.use-case';
import { GetCurrentChallengeUseCase } from './application/use-cases/get-current-challenge/get-current-challenge.use-case';
import { FindCurrentChallengeUseCase } from './application/use-cases/find-current-challenge/find-current-challenge.use-case';
import { FindNextChallengeUseCase } from './application/use-cases/find-next-challenge/find-next-challenge.use-case';
import { UploadWireTransferReceiptUseCase } from './application/use-cases/upload-wire-transfer-receipt/upload-wire-transfer-receipt.use-case';
import { UploadChallengeFileUseCase } from './application/use-cases/upload-challenge-file/upload-challenge-file.use-case';
import { ChallengeFileModelInstance } from './infrastructure/database/models/challenge-file.model';
import { ChallengeFilesService } from './infrastructure/database/services/challenge-files.service';
import { ChallengeFilesRepository } from './infrastructure/database/repositories/challenge-files.repository';
import { UsersModule } from '../users/users.module';
import { eventsHandlers } from './domain/events';
import { ListRegistrationsByChallengeIdUseCase } from './application/use-cases/list-registrations-by-challenge-id/list-registrations-by-challenge-id.use-case';
import { ListRegistrationsByUserIdUseCase } from './application/use-cases/list-registrations-by-user-id/list-registrations-by-user-id.use-case';
import { GetRegistrationWithChallengeByUserIdAndChallengeIdUseCase } from './application/use-cases/get-registration-by-user-id-and-challenge-id/get-registration-by-user-id-and-challenge-id.use-case';
import { UpdateRegistrationUseCase } from './application/use-cases/update-registration/update-registration.use-case';
import { ListChallengeFilesUseCase } from './application/use-cases/list-challenge-files/list-challenge-files.use-case';
import { GetUserChallengeFileUseCase } from './application/use-cases/get-user-challenge-file/get-user-challenge-file.use-case';
import { UpdateChallengeFileUseCase } from './application/use-cases/update-challenge-file/update-challenge-file.use-case';
import { RegisterUserToCurrentChallengeUseCase } from './application/use-cases/register-user-to-current-challenge/register-user-to-current-challenge.use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      ChallengeModelInstance,
      RegistrationModelInstance,
      ChallengeFileModelInstance,
    ]),
    IdGeneratorModule,
    SharedModule,
    VideosModule,
    UsersModule,
  ],
  providers: [
    ...commandHandlers,
    ...eventsHandlers,
    ChallengesRepository,
    ChallengesService,
    CreateChallengeUseCase,
    GetChallengeUseCase,
    ListChallengesUseCase,
    DeleteChallengeUseCase,
    UpdateChallengeUseCase,
    RegistrationsRepository,
    RegistrationsService,
    GetRegistrationUseCase,
    CreateRegistrationUseCase,
    SetRegistrationActiveUseCase,
    SetRegistrationInactiveUseCase,
    GetChallengePlaylistUseCase,
    RegisterUserToNextChallengeUseCase,
    GetPendingChallengeUseCase,
    GetCurrentChallengeUseCase,
    FindCurrentChallengeUseCase,
    FindNextChallengeUseCase,
    UploadWireTransferReceiptUseCase,
    UploadChallengeFileUseCase,
    ChallengeFilesRepository,
    ChallengeFilesService,
    ListRegistrationsByChallengeIdUseCase,
    ListRegistrationsByUserIdUseCase,
    GetRegistrationWithChallengeByUserIdAndChallengeIdUseCase,
    UpdateRegistrationUseCase,
    ListChallengeFilesUseCase,
    GetUserChallengeFileUseCase,
    UpdateChallengeFileUseCase,
    RegisterUserToCurrentChallengeUseCase,
  ],
  controllers: [ChallengesController, RegistrationsController],
  exports: [
    GetPendingChallengeUseCase,
    GetCurrentChallengeUseCase,
    UploadWireTransferReceiptUseCase,
    ListRegistrationsByUserIdUseCase,
    ListChallengeFilesUseCase,
    GetRegistrationWithChallengeByUserIdAndChallengeIdUseCase,
    UpdateChallengeFileUseCase,
    UpdateRegistrationUseCase,
    GetUserChallengeFileUseCase,
    RegisterUserToNextChallengeUseCase,
    UpdateRegistrationUseCase,
    GetUserChallengeFileUseCase,
    ChallengesService,
    RegistrationsService,
  ],
})
export class ChallengeModule {}
