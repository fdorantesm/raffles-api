import { JwtGuard } from './../../../../auth/application/guards/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CookieGuard } from './../../../../auth/application/guards/cookie.guard';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { GetRegistrationUseCase } from './../../../application/use-cases/get-registration/get-registration.use-case';
import { RegistrationEntity } from './../../../domain/entities/registration.entity';
import { CreateRegistrationUseCase } from './../../../application/use-cases/create-registration/create-registration.use-case';
import { SetRegistrationInactiveUseCase } from './../../../application/use-cases/set-registration-inactive/set-registration-inactive.use-case';
import { SetRegistrationActiveUseCase } from './../../../application/use-cases/set-registration-active/set-registration-active.use-case';
import { CreateRegistrationDto } from '../dtos/create-registration.dto';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';

@ApiTags('Challenges')
@Controller({
  version: '1',
  path: 'challenges/registrations',
})
export class RegistrationsController {
  constructor(
    private readonly setRegistrationActiveUseCase: SetRegistrationActiveUseCase,
    private readonly setRegistrationInactiveUseCase: SetRegistrationInactiveUseCase,
    private readonly createRegistrationUseCase: CreateRegistrationUseCase,
    private readonly getRegistrationUseCase: GetRegistrationUseCase,
  ) {}

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Get('/:challengeId/:userId')
  public async get(
    @Param('challengeId') challengeId: string,
    @Param('userId') userId: string,
  ): Promise<RegistrationEntity> {
    return this.getRegistrationUseCase.exec(userId, challengeId);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Post('/')
  public async create(
    @Body() registration: CreateRegistrationDto,
  ): Promise<RegistrationEntity> {
    const { challengeId, userId } = registration;
    return await this.createRegistrationUseCase.exec(userId, challengeId);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Patch('/:challengeId/:userId/activate')
  public async activate(
    @Param('challengeId') challengeId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.setRegistrationActiveUseCase.exec(userId, challengeId);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Patch('/:challengeId/:userId/deactivate')
  public async deactivate(
    @Param('challengeId') challengeId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.setRegistrationInactiveUseCase.exec(userId, challengeId);
  }
}
