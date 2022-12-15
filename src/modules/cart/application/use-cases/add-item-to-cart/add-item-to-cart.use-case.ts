import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'libs/domain/src';
import { Json } from 'src/core/domain/json';
import { CartEntity } from 'src/modules/cart/domain/entities/cart.entity';
import { ShoppingCart } from 'src/modules/cart/domain/shoppingcart';
import { CartService } from 'src/modules/cart/infrastructure/database/services/cart.service';
import { ShortIdService } from 'src/modules/shared/services/short-id.service';
import { GetCartUseCase } from '../get-cart/get-cart.use-case';

@Injectable()
export class AddItemsToCartUseCase implements UseCase {
  constructor(
    private readonly cartService: CartService,
    private readonly shortIdService: ShortIdService,
    private readonly getCartUseCase: GetCartUseCase,
  ) {}

  // TODO: Add unique Reference<>Raffle validation
  public async run(uuid: string, item: Json): Promise<CartEntity> {
    const cart = await this.cartService.findOne(uuid);
    const shortId = this.shortIdService.exec();
    const shoppingCart = new ShoppingCart(cart.uuid, cart.items);
    shoppingCart.addItem({ ...item, id: shortId });
    await this.cartService.update(uuid, shoppingCart.getItems());
    return this.getCartUseCase.run(uuid);
  }
}
