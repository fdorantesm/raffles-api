import { VideoEntity } from '../../entities/video.entity';

export class SaveVideoCommand {
  constructor(
    public playlistId: string,
    public video: VideoEntity,
    public order: number,
  ) {}
}
