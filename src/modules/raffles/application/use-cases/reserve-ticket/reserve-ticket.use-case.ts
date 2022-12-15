import { Injectable, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { TicketAssignedEvent } from 'src/modules/raffles/domain/events';
import { TicketsService } from 'src/modules/raffles/infrastructure/database/services/tickets.service';
import { DateService } from 'src/modules/shared/services/date.service';

@Injectable()
export class ReserveTicketUseCase implements UseCase {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly dateService: DateService,
    private readonly eventBus: EventBus,
  ) {}
  public async run(
    raffleId: string,
    reference: string,
    participantId: string,
    participantName: string,
  ): Promise<any> {
    const reservedAt = this.dateService.create();
    await this.ticketsService.update(
      { raffleId, reference },
      { participantId, reservedAt, participantName },
    );

    const ticket = await this.ticketsService.findOne({
      raffleId,
      reference,
      participantId,
    });

    this.eventBus.publish(
      new TicketAssignedEvent(
        ticket.uuid,
        ticket.reference,
        ticket.participantId,
        ticket.raffleId,
        ticket.assignedAt,
      ),
    );
  }
}
