import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { File } from '@thp/common/types/general/file.type';

import { PostedVideoEvent } from './../../domain/events/posted-video/posted-video.event';

@Injectable()
export class UploadVideoUseCase {
  constructor(private readonly eventBus: EventBus) {}

  public exec(playlistId: string, file: File): void {
    this.eventBus.publish(new PostedVideoEvent(playlistId, file));
  }
}
