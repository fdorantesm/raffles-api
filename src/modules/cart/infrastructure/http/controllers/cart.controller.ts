import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Json } from '@thp/common';
import { DeleteItemFromCartUseCase } from 'src/modules/cart/application/use-cases/delete-item-from-cart/delete-item-from-cart.use-case';
import { AddItemsToCartUseCase } from '../../../application/use-cases/add-item-to-cart/add-item-to-cart.use-case';
import { GetCartUseCase } from '../../../application/use-cases/get-cart/get-cart.use-case';

@Controller({
  version: '1',
  path: 'cart',
})
export class CartController {
  constructor(
    private readonly getCartUseCase: GetCartUseCase,
    private readonly addItemsToCartUseCase: AddItemsToCartUseCase,
    private readonly deleteItemFromCartUseCase: DeleteItemFromCartUseCase,
  ) {}

  @Get('/:uuid')
  public getOrCreateCart(@Param('uuid') uuid: string) {
    return this.getCartUseCase.run(uuid);
  }

  @Post('/:uuid/items')
  public addItem(@Param('uuid') uuid: string, @Body() body: Json) {
    return this.addItemsToCartUseCase.run(uuid, body);
  }

  @Delete('/:uuid/items/:itemId')
  public deleteItem(
    @Param('uuid') uuid: string,
    @Param('itemId') itemId: string,
  ) {
    return this.deleteItemFromCartUseCase.run(uuid, itemId);
  }
}
