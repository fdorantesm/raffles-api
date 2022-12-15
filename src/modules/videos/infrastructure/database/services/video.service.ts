import { VideoEntity } from '../../../domain/entities/video.entity';
import { VideoRepository } from '../repositories/video.repository';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PlaylistVideoService } from './playlist-video.service';
import { S3Service } from 'src/modules/shared/services/s3.service';
import { ConfigService } from '@nestjs/config';
import { UrlService } from 'src/modules/shared/services/url.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly playlistVideoService: PlaylistVideoService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly urlService: UrlService,
  ) {}

  public create(videoEntity: VideoEntity): Promise<VideoEntity> {
    return this.videoRepository.create(videoEntity);
  }

  public findManyById(uuid: string[]): Promise<VideoEntity[]> {
    return this.videoRepository.findManyById(uuid);
  }

  public async delete(uuid: string): Promise<void> {
    const video = await this.videoRepository.findByUuid(uuid);

    if (video) {
      const bucket = this.configService.get<string>('storage.repository');
      const key = this.urlService.getPath(video.url);
      try {
        const deleteFromPlaylist = await this.playlistVideoService.delete(uuid);
        const deleteVideo = await this.videoRepository.delete(uuid);

        if (!deleteFromPlaylist || !deleteVideo) {
          throw new InternalServerErrorException(
            `Video ${uuid} couldn't deleted`,
          );
        }

        await this.s3Service.deleteObject(bucket, key);
      } catch (error) {
        Logger.error(`An error occurs deleting video: ${uuid}`, error);
      }
    }
  }

  public async update(
    uuid: string,
    data: Partial<VideoEntity>,
  ): Promise<VideoEntity> {
    return this.videoRepository.update(uuid, data);
  }
}
