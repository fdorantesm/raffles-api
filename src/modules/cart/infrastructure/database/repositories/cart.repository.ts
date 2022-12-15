import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Json } from 'src/core/domain/json';
import { CartEntity } from 'src/modules/cart/domain/entities/cart.entity';
import { CartModel } from '../models/cart.model';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel(CartModel.name)
    private readonly model: Model<CartModel>,
  ) {}

  public async findOne(uuid: string): Promise<CartEntity> {
    const cart = await this.model.findOne({ uuid }).exec();
    if (cart) {
      return CartEntity.create({ uuid: cart.uuid, items: cart.items });
    }

    return this.create(uuid, []);
  }

  public async create(uuid: string, items?: Json[]): Promise<CartEntity> {
    const cart = await this.model.create({ uuid, items });
    return CartEntity.create({ uuid: cart.uuid, items: cart.items });
  }

  public async update(uuid: string, items: Json[]): Promise<CartEntity> {
    await this.model.updateOne({ uuid }, { items }).exec();
    return this.findOne(uuid);
  }

  public async delete(uuid: string): Promise<boolean> {
    const q = await this.model.deleteOne({ uuid }).exec();
    return q.deletedCount > 0;
  }
}
