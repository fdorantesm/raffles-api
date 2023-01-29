import { Injectable } from '@nestjs/common';

import { Json } from 'src/core/domain/json';
import { CartEntity } from 'src/modules/cart/domain/entities/cart.entity';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async findOne(uuid: string): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne(uuid);
    return cart;
  }

  public create(uuid: string, items?: Json[]): Promise<CartEntity> {
    return this.cartRepository.create(uuid, items);
  }

  public update(uuid: string, items: Json[]): Promise<CartEntity> {
    return this.cartRepository.update(uuid, items);
  }

  public delete(uuid: string): Promise<boolean> {
    return this.cartRepository.delete(uuid);
  }

  public reset(uuid: string): Promise<CartEntity> {
    return this.cartRepository.reset(uuid);
  }
}
