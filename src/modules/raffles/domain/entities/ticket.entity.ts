import { Entity } from 'src/core/domain/entity';

export class TicketEntity implements Entity {
  public uuid: string;
  public reference: string;
  public participantId: string;
  public raffleId: string;
  public assignedAt: Date;

  constructor(entity: PrizeEntityPayload) {
    this.uuid = entity.uuid;
    this.reference = entity.reference;
    this.participantId = entity.participantId;
    this.raffleId = entity.raffleId;
  }

  static create(payload: PrizeEntityPayload): TicketEntity {
    return new TicketEntity(payload);
  }
}

type PrizeEntityPayload = {
  uuid: string;
  reference: string;
  participantId?: string;
  raffleId: string;
  assignedAt?: Date;
};
