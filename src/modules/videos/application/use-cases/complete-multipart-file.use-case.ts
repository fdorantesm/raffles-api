import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PartFile } from '@thp/common/types/storage/part-file.type';
import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';
import * as first from 'lodash/first';
import * as url from 'url';
import * as get from 'lodash/get';
import * as capitalize from 'lodash/capitalize';

import { S3Service } from 'src/modules/shared/services/s3.service';
import { PlaylistVideoService } from '../../infrastructure/database/services/playlist-video.service';
import { VideoService } from '../../infrastructure/database/services/video.service';
import { PlaylistVideoEntity } from '../../domain/entities/playlist-video.entity';
import { Titlelizer } from 'src/modules/shared/services/titlelizer.service';

@Injectable()
export class CompleteMultiPartFileUseCase {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly videoService: VideoService,
    private readonly playlistVideoService: PlaylistVideoService,

    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
    private readonly titlelizer: Titlelizer,
  ) {}

  public async exec(uploadId: string, key: string, parts: PartFile[]) {
    const bucket = this.configService.get<string>('storage.repository');
    const file = await this.s3Service.completeMultipartUpload(
      bucket,
      key,
      uploadId,
      parts,
    );

    const uuid = this.idGeneratorService.exec();

    const pathParts = key.split('/');
    const filenameWithExtension = get(pathParts, 2);
    const filenameParts = filenameWithExtension.split('.');
    filenameParts.pop();

    const filename = this.titlelizer.exec(filenameParts.join(' '));

    const video = await this.videoService.create({
      uuid,
      title: capitalize(filename),
      url: file.replace(/\?.+/, ''),
    });

    const fileUrl = new url.URL(file);

    const urlPathParams = fileUrl.pathname.substring(1).split('/');
    const playlistId = urlPathParams[1];

    const videos = await this.playlistVideoService.findByPlaylistId(playlistId);

    const orderedVideos = videos.sort(
      (a, b) => (b.order || 0) - (a.order || 0),
    );

    const lastOrder: PlaylistVideoEntity = first(orderedVideos);

    await this.playlistVideoService.create({
      videoId: video.uuid,
      playlistId,
      order: (lastOrder?.order || 0) + 1,
    });

    video.url = file;

    return video;
  }
}
