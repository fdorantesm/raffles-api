import { Entity } from 'src/core/domain/entity';

export class PrizeEntity implements Entity {
  public uuid: string;
  public name: string;
  public description: string;
  public imageUrls: string[];

  constructor(entity: PrizeEntityPayload) {
    this.uuid = entity.uuid;
    this.name = entity.name;
    this.description = entity.description;
    this.imageUrls = entity.imageUrls;
  }

  static create(payload: PrizeEntityPayload): PrizeEntity {
    return new PrizeEntity(payload);
  }
}

type PrizeEntityPayload = {
  uuid: string;
  name: string;
  description?: string;
  imageUrls?: string[];
};
