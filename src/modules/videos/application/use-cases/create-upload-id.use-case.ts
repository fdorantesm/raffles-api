import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/modules/shared/services/s3.service';
import { SlugService } from 'src/modules/shared/services/slug.service';
import * as get from 'lodash/get';

@Injectable()
export class CreateUploadIdUseCase {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly slugService: SlugService,
  ) {}

  public async exec(
    path: string,
    contentType: string,
  ): Promise<{ uploadId: string; key: string }> {
    const bucket = this.configService.get<string>('storage.repository');
    const pathParts = path.split('/');
    const playlistId = get(pathParts, 0);
    const filename = get(pathParts, 1);
    const filenameParts = filename.split('.');
    const extension = filenameParts.pop();
    const slug = this.slugService.exec(filename.replace(extension, ''));
    const key = `videos/${playlistId}/${slug}.${extension}`;
    const uploadId = await this.s3Service.createMultiparUpload(
      key,
      bucket,
      contentType,
    );
    return { uploadId, key };
  }
}
