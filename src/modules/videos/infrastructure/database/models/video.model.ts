import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'videos',
  autoIndex: true,
  timestamps: true,
})
export class VideoModel extends Document {
  @Prop({ type: String, unique: true, required: true })
  public uuid: string;

  @Prop({ type: String })
  public title?: string;

  @Prop({ type: String, required: true })
  public url: string;

  @Prop({ type: String })
  public captionUrl?: string;

  @Prop({ type: String })
  public description?: string;
}

const VideoSchema = SchemaFactory.createForClass(VideoModel);

export { VideoSchema };
