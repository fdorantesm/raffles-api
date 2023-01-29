import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { IdGeneratorModule } from '@thp/id-generator';
import { SharedModule } from '../shared/shared.module';
import { AddItemsToCartUseCase } from './application/use-cases/add-item-to-cart/add-item-to-cart.use-case';
import { DeleteItemFromCartUseCase } from './application/use-cases/delete-item-from-cart/delete-item-from-cart.use-case';

import { GetCartUseCase } from './application/use-cases/get-cart/get-cart.use-case';
import { CartController } from './infrastructure/http/controllers/cart.controller';
import { CartInstance } from './infrastructure/database/models/cart.model';
import { CartRepository } from './infrastructure/database/repositories/cart.repository';
import { CartService } from './infrastructure/database/services/cart.service';
import { ResetCartUseCase } from './application/use-cases/reset-cart/reset-cart.use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([CartInstance]),
    IdGeneratorModule,
    SharedModule,
  ],
  providers: [
    CartRepository,
    CartService,
    GetCartUseCase,
    AddItemsToCartUseCase,
    DeleteItemFromCartUseCase,
    ResetCartUseCase,
  ],
  controllers: [CartController],
})
export class CartModule {}
