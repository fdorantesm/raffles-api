import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'challenges',
  autoIndex: true,
  timestamps: true,
})
export class ChallengeModel extends Document {
  @Prop({ type: String, unique: true, required: true, index: true })
  public uuid: string;

  @Prop({ type: String, required: true, index: true })
  public name: string;

  @Prop({ type: String, required: true })
  public playlistId: string;

  @Prop({ type: Boolean, required: true })
  public isActive: boolean;

  @Prop({ type: Date, index: true })
  public startsAt: Date;

  @Prop({ type: Date, index: true })
  public endsAt: Date;

  @Prop({ type: Date, index: true })
  public opensAt: Date;
}

const ChallengeSchema =
  SchemaFactory.createForClass<ChallengeModel>(ChallengeModel);

const ChallengeModelInstance = {
  name: ChallengeModel.name,
  schema: ChallengeSchema,
};

export { ChallengeSchema, ChallengeModelInstance };
