import { PlaylistEntity } from 'src/modules/videos/domain/entities/playlist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PlaylistsService } from '../../infrastructure/database/services/playlist.service';
import { VideoService } from '../../infrastructure/database/services/video.service';

@Injectable()
export class GetPlaylistUseCase {
  constructor(
    private readonly playlistService: PlaylistsService,
    private readonly videoService: VideoService,
  ) {}

  public async exec(uuid: string): Promise<PlaylistEntity> {
    const playlist = await this.playlistService.findOne({ uuid });

    if (!playlist) {
      throw new NotFoundException('resource.not_found');
    }

    return new PlaylistEntity(playlist.uuid, playlist.name);
  }
}
