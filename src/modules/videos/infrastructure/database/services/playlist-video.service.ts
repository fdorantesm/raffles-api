import { Injectable } from '@nestjs/common';

import { PlaylistVideoRepository } from './../repositories/playlist-video.repository';
import { PlaylistVideoEntity } from 'src/modules/videos/domain/entities/playlist-video.entity';

@Injectable()
export class PlaylistVideoService {
  constructor(
    private readonly playlistVideoRepository: PlaylistVideoRepository,
  ) {}

  public async create(
    playlistVideo: PlaylistVideoEntity,
  ): Promise<PlaylistVideoEntity> {
    return this.playlistVideoRepository.create(playlistVideo);
  }

  public async findByPlaylistId(
    playlistId: string,
  ): Promise<PlaylistVideoEntity[]> {
    return this.playlistVideoRepository.findByPlaylistId(playlistId);
  }

  public findByUuid(uuid: string): Promise<PlaylistVideoEntity> {
    return this.playlistVideoRepository.findByUuid(uuid);
  }

  public async delete(videoId: string): Promise<boolean> {
    const video = await this.playlistVideoRepository.findByUuid(videoId);

    if (video) {
      return await this.playlistVideoRepository.delete(videoId);
    }
  }
}
