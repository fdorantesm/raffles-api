import { PlaylistVideoModel } from './../models/playlist-video.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PlaylistVideoEntity } from 'src/modules/videos/domain/entities/playlist-video.entity';

@Injectable()
export class PlaylistVideoRepository {
  constructor(
    @InjectModel(PlaylistVideoModel.name)
    private playlistVideoModel: Model<PlaylistVideoModel>,
  ) {}

  public async create(
    playlistVideo: PlaylistVideoEntity,
  ): Promise<PlaylistVideoEntity> {
    const video = await this.playlistVideoModel.create<PlaylistVideoEntity>(
      playlistVideo,
    );
    const { playlistId, videoId, order } = video;
    return PlaylistVideoEntity.create(playlistId, videoId, order);
  }

  public async findByPlaylistId(playlistId): Promise<PlaylistVideoEntity[]> {
    const videos = await this.playlistVideoModel.find({ playlistId }).exec();

    return videos.map((video) =>
      PlaylistVideoEntity.create(video.playlistId, video.videoId, video.order),
    );
  }

  public async findByUuid(videoId: string): Promise<PlaylistVideoEntity> {
    const video = await this.playlistVideoModel.findOne({
      videoId,
    });

    if (video) {
      const { playlistId, videoId, order } = video;
      return PlaylistVideoEntity.create(playlistId, videoId, order);
    }
  }

  public async delete(videoId: string): Promise<boolean> {
    const result = await this.playlistVideoModel.deleteOne({ videoId }).exec();
    return result.deletedCount > 0;
  }
}
