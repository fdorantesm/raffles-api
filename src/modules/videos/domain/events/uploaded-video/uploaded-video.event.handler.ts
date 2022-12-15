import { IEventHandler } from '@nestjs/cqrs';

import { UploadedVideoEvent } from './uploaded-video.event';

export class UploadedVideoEventHandler
  implements IEventHandler<UploadedVideoEvent>
{
  handle(event: UploadedVideoEvent) {
    throw new Error('Method not implemented.');
  }
}
