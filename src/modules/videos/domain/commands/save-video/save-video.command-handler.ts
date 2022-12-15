import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { VideoService } from '../../../infrastructure/database/services/video.service';
import { PlaylistVideoService } from './../../../infrastructure/database/services/playlist-video.service';
import { SaveVideoCommand } from './save-video.command';

@CommandHandler(SaveVideoCommand)
export class SaveVideoCommandHandler
  implements ICommandHandler<SaveVideoCommand>
{
  constructor(
    private readonly videoService: VideoService,
    private readonly playlistVideoService: PlaylistVideoService,
  ) {}

  public async execute(command: SaveVideoCommand): Promise<void> {
    const video = await this.videoService.create(command.video);
    Logger.log(`New saved video ${video.title}`);

    const playlistVideo = await this.playlistVideoService.create({
      playlistId: command.playlistId,
      videoId: video.uuid,
      order: command.order,
    });

    Logger.log(
      `Video ${playlistVideo.videoId} stored into ${playlistVideo.playlistId}`,
    );
  }
}
