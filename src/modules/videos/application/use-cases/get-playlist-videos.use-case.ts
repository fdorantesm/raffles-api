import { Injectable, NotFoundException } from '@nestjs/common';

import { PlaylistsService } from './../../infrastructure/database/services/playlist.service';
import { PlaylistVideoService } from '../../infrastructure/database/services/playlist-video.service';
import { VideoService } from '../../infrastructure/database/services/video.service';
import {
  PlaylistVideoDto,
  PlaylistVideosDto,
} from '../../infrastructure/http/dtos/playlist-videos.dto';

@Injectable()
export class GetPlaylistVideosUseCase {
  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly videoService: VideoService,
    private readonly playlistVideoService: PlaylistVideoService,
  ) {}

  public async exec(playlistId: string): Promise<PlaylistVideosDto> {
    const playlist = await this.playlistsService.findById(playlistId);

    if (!playlist) {
      throw new NotFoundException('resource.not_found');
    }

    const playlistVideos = await this.playlistVideoService.findByPlaylistId(
      playlistId,
    );

    const uuids = playlistVideos.map((video) => video.videoId);
    const videos = await this.videoService.findManyById(uuids);

    return {
      uuid: playlist.uuid,
      name: playlist.name,
      videos: videos.map(
        (video, index) =>
          ({
            title: video.title,
            url: video.url,
            captionUrl: video.captionUrl,
            order: playlistVideos[index].order,
          } as unknown as PlaylistVideoDto),
      ),
    };
  }
}
