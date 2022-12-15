import { VideoEntity } from './../../../domain/entities/video.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { VideoModel } from '../models/video.model';

@Injectable()
export class VideoRepository {
  constructor(
    @InjectModel(VideoModel.name)
    private readonly videoModel: Model<VideoModel>,
  ) {}

  public async create(videoEntity: VideoEntity): Promise<VideoEntity> {
    const video = await this.videoModel.create(videoEntity);
    const { uuid, title, url, captionUrl, description } = video;
    return VideoEntity.create({ uuid, title, url, captionUrl, description });
  }

  public async findManyById(uuid: string[]): Promise<VideoEntity[]> {
    const videos = await this.videoModel
      .find({
        uuid: {
          $in: uuid,
        },
      })
      .sort({ createdAt: 1 });
    return videos.map(({ uuid, title, url, captionUrl, description }) =>
      VideoEntity.create({ uuid, title, url, captionUrl, description }),
    );
  }

  public async findByUuid(uuid: string): Promise<VideoEntity> {
    const video = await this.videoModel.findOne({
      uuid,
    });

    if (video) {
      const { title, url, captionUrl, description } = video;
      return VideoEntity.create({ uuid, title, url, captionUrl, description });
    }
  }

  public async delete(uuid: string): Promise<boolean> {
    const result = await this.videoModel.deleteOne({ uuid }).exec();
    return result.deletedCount > 0;
  }

  public async update(
    uuid: string,
    data: Partial<VideoEntity>,
  ): Promise<VideoEntity> {
    return await this.videoModel
      .updateOne({ uuid }, data)
      .then(() => this.findByUuid(uuid));
  }
}
