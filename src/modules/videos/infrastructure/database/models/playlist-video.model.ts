import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'playlistVideos',
  timestamps: true,
  autoIndex: true,
})
export class PlaylistVideoModel extends Document {
  @Prop({ type: String, required: true, index: true })
  public playlistId: string;

  @Prop({ type: String, required: true, index: true })
  public videoId: string;

  @Prop({ type: Number })
  public order?: number;
}

const PlaylistVideoSchema = SchemaFactory.createForClass(PlaylistVideoModel);

const PlaylistVideoInstance = {
  name: PlaylistVideoModel.name,
  schema: PlaylistVideoSchema,
};

export { PlaylistVideoSchema, PlaylistVideoInstance };
