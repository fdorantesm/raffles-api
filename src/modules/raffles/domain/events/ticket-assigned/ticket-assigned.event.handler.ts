import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TicketAssignedEvent } from './ticket-assigned.event';

@EventsHandler(TicketAssignedEvent)
export class TicketAssignedEventHandler
  implements IEventHandler<TicketAssignedEvent>
{
  public async handle(ticket: TicketAssignedEvent) {
    Logger.log(
      `${ticket.uuid} assigned to ${ticket.participantId}`,
      TicketAssignedEventHandler.name,
    );
  }
}
