import { IEvent } from '@nestjs/cqrs';

export class TicketReservedEvent implements IEvent {
  constructor(
    public uuid: string,
    public reference: string,
    public participantId: string,
    public raffleId: string,
    public reservedAt: Date,
  ) {}
}
