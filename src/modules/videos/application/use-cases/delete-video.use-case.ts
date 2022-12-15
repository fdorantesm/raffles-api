import { Injectable, NotFoundException } from '@nestjs/common';

import { VideoService } from '../../infrastructure/database/services/video.service';

@Injectable()
export class DeleteVideoUseCase {
  constructor(private readonly videosService: VideoService) {}

  public async exec(videoId: string) {
    const videos = await this.videosService.findManyById([videoId]);

    if (videos.length === 0) {
      throw new NotFoundException('resource.not_found');
    }

    await this.videosService.delete(videoId);
  }
}
