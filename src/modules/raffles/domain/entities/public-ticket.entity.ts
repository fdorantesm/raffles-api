import { Entity } from 'src/core/domain/entity';

export class PublicTicketEntity implements Entity {
  public raffleId: string;
  public reference: string;
}
