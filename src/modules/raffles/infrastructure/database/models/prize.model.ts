import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Instance } from 'src/core/application/models/instance';

@Schema({
  timestamps: true,
  autoIndex: true,
  collection: 'prizes',
  autoCreate: true,
})
export class PrizeModel extends Document {
  @Prop({ type: String })
  public uuid: string;

  @Prop({ type: String })
  public name: string;
  @Prop({ type: String })
  public description: string;
  @Prop({ type: [String] })
  public imageUrls?: string[];
}

export const PrizeSchema = SchemaFactory.createForClass(PrizeModel);

export const PrizeInstance: Instance = {
  name: PrizeModel.name,
  schema: PrizeSchema,
};
