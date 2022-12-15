import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Instance } from 'src/core/application/models/instance';
import { RaffleStatus } from 'src/modules/raffles/domain/enums/raffle-status.enum';

@Schema({
  timestamps: true,
  autoIndex: true,
  collection: 'raffles',
  autoCreate: true,
})
export class RaffleModel extends Document {
  @Prop({ type: String, required: true })
  public uuid: string;

  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String })
  public description?: string;

  @Prop({ type: Number, required: true })
  public price: number;

  @Prop({ type: Number, required: true })
  public ticketsQuantity: number;

  @Prop({ type: String, required: true })
  public prizeId: string;

  @Prop({ type: String })
  public raffleUrl: string;

  @Prop({ type: Date, required: true })
  public raffleDate: Date;

  @Prop({ type: String, enum: RaffleStatus })
  public status: RaffleStatus;

  @Prop({ type: Date })
  public deletedAt: Date;
}

export const RaffleSchema = SchemaFactory.createForClass(RaffleModel);

export const RaffleInstance: Instance = {
  name: RaffleModel.name,
  schema: RaffleSchema,
};
