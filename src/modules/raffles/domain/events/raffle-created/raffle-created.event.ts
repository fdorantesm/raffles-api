import { IEvent } from '@nestjs/cqrs';
import { RaffleStatus } from '../../enums/raffle-status.enum';

export class RaffleCreatedEvent implements IEvent {
  constructor(
    public uuid: string,
    public name: string,
    public description: string,
    public price: number,
    public ticketsQuantity: number,
    public prizeId: string,
    public raffleUrl: string,
    public raffleDate: Date,
    public status: RaffleStatus,
  ) {}
}
