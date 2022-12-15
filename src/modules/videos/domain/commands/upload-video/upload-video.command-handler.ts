import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, CommandBus } from '@nestjs/cqrs';
import { InjectS3, S3 } from 'nestjs-s3';
import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';

import { SaveVideoCommand } from './../save-video/save-video.command';
import { ICommandHandler } from './../../../../../../node_modules/@nestjs/cqrs/dist/interfaces/commands/command-handler.interface.d';
import { UploadVideoCommand } from './upload-video.command';

@CommandHandler(UploadVideoCommand)
export class UploadVideoCommandHandler implements ICommandHandler {
  constructor(
    @InjectS3()
    private readonly s3: S3,
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,

    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGenerator: IdGeneratorService,
  ) {}

  public async execute(command: UploadVideoCommand): Promise<any> {
    const bucket = this.configService.get<string>('storage.repository');
    const filename = this.idGenerator.exec();
    const extension = command.originalname.split('.').pop();
    Logger.log('Upload to s3', UploadVideoCommandHandler.name);

    try {
      const object = await this.s3
        .upload({
          Bucket: bucket,
          Key: `videos/${command.playlistId}/${filename}.${extension}`,
          Body: command.buffer,
        })
        .promise();
      Logger.log(`Uploaded video ${object.Location}`, 'S3');
      this.commandBus.execute(
        new SaveVideoCommand(
          command.playlistId,
          {
            uuid: this.idGenerator.exec(),
            title: command.originalname,
            url: object.Location,
          },
          0,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
