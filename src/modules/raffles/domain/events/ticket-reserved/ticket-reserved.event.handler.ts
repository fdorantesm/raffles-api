import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TicketReservedEvent } from './ticket-reserved.event';

@EventsHandler(TicketReservedEvent)
export class TicketReservedEventHandler
  implements IEventHandler<TicketReservedEvent>
{
  public async handle(ticket: TicketReservedEvent) {
    Logger.log(
      `${ticket.uuid} reserved to ${ticket.participantId}`,
      TicketReservedEventHandler.name,
    );
    // TODO: Email payment data
  }
}
