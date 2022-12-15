import { Json } from '@thp/common';
import { Entity } from 'src/core/domain/entity';

export class CartEntity implements Entity {
  public uuid: string;
  public items: Json[];
  public total: number;

  constructor(payload: CartEntityPayload) {
    this.uuid = payload.uuid;
    this.items = payload.items;
    this.total = payload.total;
  }

  static create(payload: CartEntityPayload): CartEntity {
    return new CartEntity({
      uuid: payload.uuid,
      items: payload.items,
      total: payload.total,
    });
  }
}

type CartEntityPayload = {
  uuid: string;
  items: Json[];
  total?: number;
};
