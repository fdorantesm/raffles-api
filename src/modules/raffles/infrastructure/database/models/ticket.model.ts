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
  @Prop({ type: String })
  public uuid: string;

  @Prop({ type: String })
  public reference: string;

  @Prop({ type: String })
  public participantId: string;

  @Prop({ type: String })
  public raffleId: string;

  @Prop({ type: Date })
  public assignedAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(TicketModel);

export const TicketInstance: Instance = {
  name: TicketModel.name,
  schema: TicketSchema,
};
