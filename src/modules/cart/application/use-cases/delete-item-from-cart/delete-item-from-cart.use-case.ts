import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from 'libs/domain/src';
import { CartEntity } from 'src/modules/cart/domain/entities/cart.entity';
import { ShoppingCart } from 'src/modules/cart/domain/shoppingcart';
import { CartService } from 'src/modules/cart/infrastructure/database/services/cart.service';

@Injectable()
export class DeleteItemFromCartUseCase implements UseCase {
  constructor(private readonly cartService: CartService) {}
  public async run(cartId: string, itemId: string): Promise<CartEntity> {
    const cart = await this.cartService.findOne(cartId);

    if (!cart) {
      throw new NotFoundException('resource.not_found');
    }

    const shoppingCart = new ShoppingCart(cartId, cart.items);

    const itemExists = shoppingCart.getItem(itemId);

    if (!itemExists) {
      throw new NotFoundException('resource.not_found');
    }

    shoppingCart.deleteItem(itemId);

    await this.cartService.update(cartId, shoppingCart.getItems());

    return shoppingCart.getCart();
  }
}
