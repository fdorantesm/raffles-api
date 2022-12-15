import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { IdGeneratorModule } from '@thp/id-generator';

import { SharedModule } from '../shared/shared.module';
import { AssignTicketUseCase } from './application/use-cases/assign-ticket/assign-ticket.use-case';
import { CancelRaffleUseCase } from './application/use-cases/cancel-raffle/cancel-raffle.use-case';
import { CreatePrizeUseCase } from './application/use-cases/create-prize/create-prize.use-case';
import { CreateRaffleUseCase } from './application/use-cases/create-raffle/create-raffle.use-case';
import { EventHandlers } from './domain/events';
import { PrizeInstance } from './infrastructure/database/models/prize.model';
import { RaffleInstance } from './infrastructure/database/models/raffle.model';
import { TicketInstance } from './infrastructure/database/models/ticket.model';
import { PrizesRepository } from './infrastructure/database/repositories/prizes.repository';
import { RafflesRepository } from './infrastructure/database/repositories/raffles.repository';
import { TicketsRepository } from './infrastructure/database/repositories/tickets.repository';
import { PrizesService } from './infrastructure/database/services/prizes.service';
import { RafflesService } from './infrastructure/database/services/raffles.service';
import { TicketsService } from './infrastructure/database/services/tickets.service';
import { PrizesController } from './infrastructure/http/controllers/prizes.controller';
import { RafflesController } from './infrastructure/http/controllers/raffles.controller';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([RaffleInstance, PrizeInstance, TicketInstance]),
    IdGeneratorModule,
    SharedModule,
  ],
  providers: [
    ...EventHandlers,
    RafflesRepository,
    PrizesRepository,
    TicketsRepository,
    RafflesService,
    PrizesService,
    TicketsService,
    CreateRaffleUseCase,
    CancelRaffleUseCase,
    CreatePrizeUseCase,
    AssignTicketUseCase,
  ],
  controllers: [RafflesController, PrizesController],
  exports: [
    CreateRaffleUseCase,
    CancelRaffleUseCase,
    CreatePrizeUseCase,
    AssignTicketUseCase,
  ],
})
export class RafflesModule {}
