import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { ChallengeFileOptions } from '../types/challenge-file-options.type';

@Schema({
  collection: 'challengeFiles',
  timestamps: true,
  autoIndex: true,
})
export class ChallengeFileModel extends Document {
  @Prop({ type: String, unique: true })
  public uuid: string;

  @Prop({ type: String })
  public name: string;

  @Prop({ type: String })
  public challengeId: string;

  @Prop({ type: String })
  public url: string;

  @Prop({ type: Object })
  public options: ChallengeFileOptions;
}

const ChallengeFileSchema = SchemaFactory.createForClass(ChallengeFileModel);

ChallengeFileSchema.index(
  {
    challengeId: 1,
    options: 1,
  },
  { unique: true },
);

export const ChallengeFileModelInstance = {
  name: ChallengeFileModel.name,
  schema: ChallengeFileSchema,
};

export { ChallengeFileSchema };
