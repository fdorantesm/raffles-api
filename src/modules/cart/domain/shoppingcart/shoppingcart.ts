import { Json } from '@thp/common';

import { CartEntity } from '../entities/cart.entity';

export class ShoppingCart {
  private uuid: string;
  private items: Json[];

  constructor(uuid: string, items: Json[]) {
    this.uuid = uuid;
    this.items = items;
  }

  public addItem(item: Json): void {
    this.items.push(item);
  }

  public getItem(itemId): Json {
    return this.items.find((item) => item.id === itemId);
  }

  public reset(): void {
    this.items = [];
  }

  public getItems(): Json[] {
    return this.items;
  }

  public deleteItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  getId() {
    return this.uuid;
  }

  getCart(): CartEntity {
    return CartEntity.create({
      uuid: this.getId(),
      items: this.getItems(),
    });
  }
}
