import { Logger } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UploadVideoCommand } from '../../commands';

import { PostedVideoEvent } from './posted-video.event';

@EventsHandler(PostedVideoEvent)
export class PostedVideoEventHandler
  implements IEventHandler<PostedVideoEvent>
{
  constructor(private readonly commandBus: CommandBus) {}

  public handle(event: PostedVideoEvent) {
    const file = event.file;
    Logger.log('Posted video', PostedVideoEventHandler.name);
    this.commandBus.execute(
      new UploadVideoCommand(
        event.playlistId,
        file.fieldname,
        file.originalname,
        file.enconding,
        file.mimetype,
        file.buffer,
        file.size,
      ),
    );
  }
}
