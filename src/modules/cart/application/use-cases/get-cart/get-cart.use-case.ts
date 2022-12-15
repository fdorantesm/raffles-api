import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';

import { UseCase } from 'libs/domain/src';
import { arrayToMap } from 'src/core/utils/array-to-map.util';
import { trimArray } from 'src/core/utils/trim-array.util';
import { CartEntity } from 'src/modules/cart/domain/entities/cart.entity';
import { CartService } from 'src/modules/cart/infrastructure/database/services/cart.service';
import { FindRafflesByUuidsCommand } from 'src/modules/raffles/domain/commands';
import { RaffleEntity } from 'src/modules/raffles/domain/entities/raffle.entity';

@Injectable()
export class GetCartUseCase implements UseCase {
  constructor(
    private readonly cartService: CartService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
    private readonly commandBus: CommandBus,
  ) {}
  public async run(uuid?: string): Promise<CartEntity> {
    const ref = uuid || this.idGeneratorService.exec();
    const cart = await this.cartService.findOne(ref);

    const raffleIds = trimArray(cart.items.map((item) => item.raffleId));

    const raffles = await this.commandBus.execute(
      new FindRafflesByUuidsCommand(raffleIds),
    );

    const rafflesMap = arrayToMap<RaffleEntity>(raffles);

    cart.total = cart.items.reduce((sum, current) => {
      const raffle = rafflesMap.get(current.raffleId);
      return sum + raffle.price;
    }, 0);

    return cart;
  }
}
