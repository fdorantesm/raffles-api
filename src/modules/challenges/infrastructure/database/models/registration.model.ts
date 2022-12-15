import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Modality } from 'src/modules/challenges/domain/enums/modality.enum';

@Schema({
  collection: 'registrations',
  timestamps: true,
  autoIndex: true,
})
export class RegistrationModel extends Document {
  @Prop({ type: String, unique: true, index: true })
  public uuid: string;

  @Prop({ type: String })
  public userId: string;

  @Prop({ type: String })
  public challengeId: string;

  @Prop({ type: Date })
  public registeredAt: Date;

  @Prop({ type: Number })
  public bmi: number;

  @Prop({ type: Boolean })
  public withProtein: boolean;

  @Prop({ type: Number })
  public height: number;

  @Prop({ type: Number })
  public weight: number;

  @Prop({ type: Boolean })
  public isActive: boolean;

  @Prop({ type: String })
  public wireTransferReceiptUrl?: string;

  @Prop({ type: String })
  public modality?: Modality;
}

const RegistrationSchema = SchemaFactory.createForClass(RegistrationModel);

RegistrationSchema.index({
  userId: 1,
  challengeId: 1,
});

export const RegistrationModelInstance = {
  name: RegistrationModel.name,
  schema: RegistrationSchema,
};

export { RegistrationSchema };
