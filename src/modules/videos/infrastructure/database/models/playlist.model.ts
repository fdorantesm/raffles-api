import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'playlists',
  autoIndex: true,
  timestamps: true,
})
export class PlaylistModel extends Document {
  @Prop({ type: String, required: true, unique: true })
  public uuid: string;

  @Prop({ type: String, required: true })
  public name: string;
}

const PlaylistSchema = SchemaFactory.createForClass(PlaylistModel);

export { PlaylistSchema };
