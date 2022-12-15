import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File } from '@thp/common/types/general/file.type';
import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';

import { S3Service } from 'src/modules/shared/services/s3.service';

@Injectable()
export class UploadPartVideoUseCase {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public async exec(
    playlistId: string,
    file: File,
    uploadId: string,
    partNumber: number,
    fileId: string,
  ) {
    const bucket = this.configService.get<string>('storage.repository');
    const eTag = await this.s3Service.uploadPart(
      bucket,
      fileId,
      file.buffer,
      uploadId,
      partNumber,
    );

    return {
      eTag: eTag.replace('"', ''),
      partNumber,
    };
  }
}
