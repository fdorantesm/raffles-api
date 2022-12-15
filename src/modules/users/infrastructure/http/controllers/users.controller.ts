import { JwtGuard } from './../../../../auth/application/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CookieGuard } from './../../../../auth/application/guards/cookie.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { ListUsersUseCase } from './../../../application/use-cases/list-users/list-users.use-case';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

@ApiTags('Users')
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  // TODO Move from here to AdminController
  @Get('/customers')
  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  public getCustomers(@Query() filter: any): Promise<UserEntity[]> {
    return this.listUsersUseCase.exec(filter);
  }
}
