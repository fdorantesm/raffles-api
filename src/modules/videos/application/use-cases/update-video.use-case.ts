import { Injectable, NotFoundException } from '@nestjs/common';
import { VideoEntity } from '../../domain/entities/video.entity';
import { VideoService } from '../../infrastructure/database/services/video.service';

@Injectable()
export class UpdateVideoUseCase {
  constructor(private readonly videosService: VideoService) {}

  public async exec(videoId: string, data: Partial<VideoEntity>) {
    const video = await this.videosService.findManyById([videoId]);

    if (!video) {
      throw new NotFoundException('resource.not_found');
    }

    const updatedVideo = await this.videosService.update(videoId, data);

    return updatedVideo;
  }
}
