import { IEvent } from '@nestjs/cqrs';

export class TicketAssignedEvent implements IEvent {
  constructor(
    public uuid: string,
    public reference: string,
    public participantId: string,
    public raffleId: string,
    public assignedAt: Date,
  ) {}
}
