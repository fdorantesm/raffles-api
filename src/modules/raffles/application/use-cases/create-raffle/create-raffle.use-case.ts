import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ID_GENERATOR_SERVICE, UuidGeneratorService } from '@thp/id-generator';
import { UseCase } from 'libs/domain/src';
import { RaffleEntity } from 'src/modules/raffles/domain/entities/raffle.entity';
import { RaffleStatus } from 'src/modules/raffles/domain/enums/raffle-status.enum';
import { RaffleCreatedEvent } from 'src/modules/raffles/domain/events';

import { RafflesService } from 'src/modules/raffles/infrastructure/database/services/raffles.service';
import { CreateRaffleRequestDto } from 'src/modules/raffles/infrastructure/http/dtos/create-raffle.request-dto';
import { DateService } from 'src/modules/shared/services/date.service';

@Injectable()
export class CreateRaffleUseCase implements UseCase {
  constructor(
    private readonly rafflesService: RafflesService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly uuidGeneratorService: UuidGeneratorService,
    private readonly eventBus: EventBus,
  ) {}
  public async run(data: CreateRaffleRequestDto): Promise<any> {
    const uuid = this.uuidGeneratorService.exec();
    const {
      name,
      price,
      prizeId,
      raffleUrl,
      raffleDate,
      description,
      ticketsQuantity,
    } = data;

    const raffle = await this.rafflesService.create(
      RaffleEntity.create({
        uuid,
        name,
        price,
        prizeId,
        raffleUrl,
        raffleDate,
        description,
        ticketsQuantity,
        status: RaffleStatus.PENDING,
      }),
    );

    this.eventBus.publish(
      new RaffleCreatedEvent(
        raffle.uuid,
        raffle.name,
        raffle.description,
        raffle.price,
        raffle.ticketsQuantity,
        raffle.prizeId,
        raffle.raffleUrl,
        raffle.raffleDate,
        raffle.status,
      ),
    );

    return raffle;
  }
}
