import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { CreatePrizeUseCase } from 'src/modules/raffles/application/use-cases/create-prize/create-prize.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CreatePrizeRequestDto } from '../dtos/create-prize.request-dto';

@Controller({
  version: '1',
  path: 'prizes',
})
export class PrizesController {
  constructor(private readonly createPrizeUseCase: CreatePrizeUseCase) {}

  @Post('/')
  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  public createPrize(@Body() body: CreatePrizeRequestDto) {
    return this.createPrizeUseCase.run(body);
  }
}
