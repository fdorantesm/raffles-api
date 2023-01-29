import { Injectable } from '@nestjs/common';
import { UseCase } from 'libs/domain/src';
import { CartEntity } from 'src/modules/cart/domain/entities/cart.entity';
import { ShoppingCart } from 'src/modules/cart/domain/shoppingcart/shoppingcart';
import { CartService } from 'src/modules/cart/infrastructure/database/services/cart.service';

@Injectable()
export class ResetCartUseCase implements UseCase {
  constructor(private readonly cartService: CartService) {}
  public async run(uuid: string): Promise<CartEntity> {
    const cart = await this.cartService.findOne(uuid);
    const shoppingCart = new ShoppingCart(cart.uuid, cart.items);
    shoppingCart.reset();
    await this.cartService.update(uuid, shoppingCart.getItems());
    return shoppingCart.getCart();
  }
}
