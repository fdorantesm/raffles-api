import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Instance } from 'src/core/application/models/instance';

@Schema({
  timestamps: true,
  autoIndex: true,
  collection: 'tickets',
  autoCreate: true,
})
export class TicketModel extends Document {
  @Prop({ type: String, required: true })
  public uuid: string;

  @Prop({ type: String, required: true })
  public reference: string;

  @Prop({ type: String, required: false })
  public participantId?: string;

  @Prop({ type: String, required: false })
  public participantName?: string;

  @Prop({ type: String, required: true })
  public raffleId: string;

  @Prop({ type: Date, required: false })
  public assignedAt?: Date;

  @Prop({ type: Boolean, required: false })
  public isReserved?: boolean;

  @Prop({ type: Date, required: false })
  public reservedAt?: Date;
}

export const TicketSchema = SchemaFactory.createForClass(TicketModel);

export const TicketInstance: Instance = {
  name: TicketModel.name,
  schema: TicketSchema,
};
