import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';
import { TicketsService } from 'src/modules/raffles/infrastructure/database/services/tickets.service';
import { TicketEntity } from '../../entities/ticket.entity';
import { RaffleCreatedEvent } from './raffle-created.event';

@EventsHandler(RaffleCreatedEvent)
export class RaffleCreatedEventHandler
  implements IEventHandler<RaffleCreatedEvent>
{
  constructor(
    private readonly ticketsService: TicketsService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public async handle(raffle: RaffleCreatedEvent) {
    const promises = Array.from(Array(raffle.ticketsQuantity).keys()).map(
      (ticket) => {
        const uuid = this.idGeneratorService.exec();
        return this.ticketsService.create(
          TicketEntity.create({
            uuid,
            reference: String(ticket + 1).padStart(3, '0'),
            raffleId: raffle.uuid,
          }),
        );
      },
    );

    const tasks = await Promise.allSettled(promises);

    tasks.map((task) => {
      if (task.status === 'fulfilled') {
        Logger.log(
          `${raffle.name} - Ticket #${task.value.reference} created.`,
          RaffleCreatedEventHandler.name,
        );
      } else {
        Logger.error(task.reason, RaffleCreatedEventHandler.name);
      }
    });
  }
}
