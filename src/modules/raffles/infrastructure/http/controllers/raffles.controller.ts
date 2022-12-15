import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRequest } from '@thp/common/types/http/user-request.type';

import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { AssignTicketUseCase } from 'src/modules/raffles/application/use-cases/assign-ticket/assign-ticket.use-case';
import { CancelRaffleUseCase } from 'src/modules/raffles/application/use-cases/cancel-raffle/cancel-raffle.use-case';
import { CreateRaffleUseCase } from 'src/modules/raffles/application/use-cases/create-raffle/create-raffle.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CreateRaffleRequestDto } from '../dtos/create-raffle.request-dto';

@Controller({ version: '1', path: 'raffles' })
export class RafflesController {
  constructor(
    private readonly createRaffleUseCase: CreateRaffleUseCase,
    private readonly cancelRaffleUseCase: CancelRaffleUseCase,
    private readonly assignTicketUseCase: AssignTicketUseCase,
  ) {}

  @Post('/')
  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  public createRaffle(@Body() createRaffleRequestDto: CreateRaffleRequestDto) {
    return this.createRaffleUseCase.run(createRaffleRequestDto);
  }

  @Patch('/:uuid')
  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  public cancelRaffle(@Param('uuid') uuid: string) {
    return this.cancelRaffleUseCase.run(uuid);
  }

  @Patch('/:uuid/tickets/:reference')
  @Scopes(Scope.RAFFLES)
  @UseGuards(JwtGuard, ScopeGuard)
  public assignTicket(
    @Param('uuid') uuid: string,
    @Param('reference') reference: string,
    @Request() req: UserRequest,
  ) {
    return this.assignTicketUseCase.run(uuid, reference, req.user.id);
  }
}
