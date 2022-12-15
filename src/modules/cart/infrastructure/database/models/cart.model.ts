import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Json } from '@thp/common';
import { Document } from 'mongoose';

import { Instance } from 'src/core/application/models/instance';

@Schema({
  timestamps: true,
  autoIndex: true,
  collection: 'cart',
  autoCreate: true,
})
export class CartModel extends Document {
  @Prop({ type: String })
  public uuid: string;

  @Prop({ type: Array })
  public items: Json[];
}

export const CartSchema = SchemaFactory.createForClass(CartModel);

export const CartInstance: Instance = {
  name: CartModel.name,
  schema: CartSchema,
};
