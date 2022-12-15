import { RaffleCreatedEventHandler } from './raffle-created/raffle-created.event.handler';
import { TicketAssignedEventHandler } from './ticket-assigned/ticket-assigned.event.handler';
import { TicketReservedEvent } from './ticket-reserved/ticket-reserved.event';

export * from './raffle-created/raffle-created.event';
export * from './raffle-created/raffle-created.event.handler';
export * from './ticket-assigned/ticket-assigned.event';
export * from './ticket-assigned/ticket-assigned.event.handler';
export * from './ticket-reserved/ticket-reserved.event';
export * from './ticket-reserved/ticket-reserved.event.handler';

export const EventHandlers = [
  RaffleCreatedEventHandler,
  TicketAssignedEventHandler,
  TicketReservedEvent,
];
