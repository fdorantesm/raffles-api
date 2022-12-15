import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BYTES, mib } from '@thp/common/consts/byte-units.const';

import { S3Service } from 'src/modules/shared/services/s3.service';
import { PlaylistsService } from '../../infrastructure/database/services/playlist.service';

@Injectable()
export class StreamVideoUseCase {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(path: string, range: string) {
    if (!range) {
      throw new HttpException('Range not satisfiable', 416);
    }

    const bucket = this.configService.get<string>('storage.repository');
    const key = `videos/${path}`;
    const { contentLength: videoSize, contentType } =
      await this.s3Service.headObject(bucket, key);

    const chunkSize = 1 * mib;

    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;

    const file = this.s3Service.getObjectStream(bucket, key, range);

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Range': BYTES,
      'Content-Length': contentLength,
      'Content-Type': contentType,
    };

    return {
      file,
      headers,
    };
  }
}
