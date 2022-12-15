import { GetRegistrationByUuidUseCase } from './../../../application/use-cases/get-registration-by-uuid.use-case';
import { UploadWireTransferReceiptUseCase } from './../../../../challenges/application/use-cases/upload-wire-transfer-receipt/upload-wire-transfer-receipt.use-case';
import { JwtGuard } from './../../../../auth/application/guards/jwt.guard';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserRequest } from '@thp/common/types/http/user-request.type';
import { GetPendingChallengeUseCase } from '../../../../challenges/application/use-cases/get-pending-challenge/get-pending-challenge.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { GetCurrentChallengeUseCase } from 'src/modules/challenges/application/use-cases/get-current-challenge/get-current-challenge.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '@thp/common/types/general/file.type';
import { ListRegistrationsByUserIdUseCase } from 'src/modules/challenges/application/use-cases/list-registrations-by-user-id/list-registrations-by-user-id.use-case';
import { GetRegistrationWithChallengeByUserIdAndChallengeIdUseCase } from 'src/modules/challenges/application/use-cases/get-registration-by-user-id-and-challenge-id/get-registration-by-user-id-and-challenge-id.use-case';
import { UpdateUserProfileUseCase } from 'src/modules/users/application/use-cases/update-user-profile/update-user-profile.use-case';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { UpdateRegistrationDto } from '../dtos/update-registration';
import { UpdateRegistrationUseCase } from 'src/modules/challenges/application/use-cases/update-registration/update-registration.use-case';
import { GetUserChallengeFileUseCase } from 'src/modules/challenges/application/use-cases/get-user-challenge-file/get-user-challenge-file.use-case';
import { RegisterUserToNextChallengeUseCase } from 'src/modules/challenges/application/use-cases/register-user-to-next-challenge/register-user-to-next-challenge.use-case';

@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(
    private readonly getPendingChallengeUseCase: GetPendingChallengeUseCase,
    private readonly getCurrentChallengeUseCase: GetCurrentChallengeUseCase,
    private readonly uploadWireTransferReceiptUseCase: UploadWireTransferReceiptUseCase,
    private readonly getRegistrationByUuidUseCase: GetRegistrationByUuidUseCase,
    private readonly listRegistrationsByUserIdUseCase: ListRegistrationsByUserIdUseCase,
    private readonly getRegistrationWithChallengeByUserIdAndChallengeId: GetRegistrationWithChallengeByUserIdAndChallengeIdUseCase,
    private readonly updateRegistrationUseCase: UpdateRegistrationUseCase,
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly getUserChallengeFileUseCase: GetUserChallengeFileUseCase,
    private readonly registerUserToNextChallengeUseCase: RegisterUserToNextChallengeUseCase,
  ) {}

  @Get('/challenge/pending')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public getPendingChallenge(@Req() request: UserRequest) {
    return this.getPendingChallengeUseCase.exec(request.user.id);
  }

  @Get('/challenge/active')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public getCurrentChallenge(@Req() request: UserRequest) {
    return this.getCurrentChallengeUseCase.exec(request.user.id);
  }

  @Get('/registrations')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public async getRegistrations(@Req() req: UserRequest) {
    return this.listRegistrationsByUserIdUseCase.exec(req.user.id);
  }

  @Get('/registrations/:uuid')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public async getRegistration(
    @Param('uuid') uuid: string,
    @Req() req: UserRequest,
  ) {
    return this.getRegistrationByUuidUseCase.exec(uuid, req.user.id);
  }

  @Get('/registrations/challenge/:challengeId')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public async getRegistrationByChallengeId(
    @Param('challengeId') challengeId: string,
    @Req() req: UserRequest,
  ) {
    return this.getRegistrationWithChallengeByUserIdAndChallengeId.exec(
      req.user.id,
      challengeId,
    );
  }

  @Get('/challenge/:uuid/file')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public async getChallengeFile(
    @Req() req: UserRequest,
    @Param('uuid') uuid: string,
  ) {
    return this.getUserChallengeFileUseCase.exec(req.user.id, uuid);
  }

  @Post('/registrations/:uuid/payment')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadWireTransferReceipt(
    @Req() req: UserRequest,
    @Param('uuid') uuid: string,
    @UploadedFile() file: File,
  ) {
    return this.uploadWireTransferReceiptUseCase.exec(req.user.id, uuid, file);
  }

  @Patch('/registrations/:uuid')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public async updateRegistrationProfile(
    @Param('uuid') uuid: string,
    @Body() body: UpdateRegistrationDto,
  ) {
    return this.updateRegistrationUseCase.exec(uuid, body);
  }

  @Patch('/profile')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public async updateProfile(
    @Req() req: UserRequest,
    @Body() body: UpdateProfileDto,
  ) {
    return this.updateUserProfileUseCase.exec(req.user.id, body);
  }

  @Post('/challenges')
  @Scopes(Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  public joinNextChallenge(@Req() req: UserRequest) {
    return this.registerUserToNextChallengeUseCase.exec(req.user.id);
  }
}
