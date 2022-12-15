import { Entity } from 'src/core/domain/entity';

import { RaffleStatus } from '../enums/raffle-status.enum';

export class RaffleEntity implements Entity {
  public uuid: string;
  public name: string;
  public description?: string;
  public price: number;
  public ticketsQuantity: number;
  public prizeId: string;
  public raffleUrl: string;
  public raffleDate: Date;
  public status: RaffleStatus;
  public deletedAt: Date;

  constructor(entity: RaffleEntityPayload) {
    this.uuid = entity.uuid;
    this.name = entity.name;
    this.description = entity.description;
    this.price = entity.price;
    this.ticketsQuantity = entity.ticketsQuantity;
    this.prizeId = entity.prizeId;
    this.raffleUrl = entity.raffleUrl;
    this.raffleDate = entity.raffleDate;
    this.status = entity.status;
    this.deletedAt = entity.deletedAt;
  }

  static create(entity: RaffleEntityPayload): RaffleEntity {
    return new RaffleEntity(entity);
  }
}

type RaffleEntityPayload = {
  uuid: string;
  name: string;
  description?: string;
  price: number;
  ticketsQuantity: number;
  prizeId: string;
  raffleUrl: string;
  raffleDate: Date;
  status: RaffleStatus;
  deletedAt?: Date;
};
