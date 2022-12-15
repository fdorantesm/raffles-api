import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File } from '@thp/common/types/general/file.type';
import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';

import { ChallengeFilesService } from 'src/modules/challenges/infrastructure/database/services/challenge-files.service';
import { S3Service } from 'src/modules/shared/services/s3.service';

@Injectable()
export class UpdateChallengeFileUseCase {
  constructor(
    private readonly challengesFileService: ChallengeFilesService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(challengeId: string, fileId: string, file: File) {
    const challengeFile = await this.challengesFileService.findOne({
      challengeId,
      uuid: fileId,
    });

    if (!challengeFile) {
      throw new NotFoundException();
    }

    const key = challengeFile.url.replace(
      /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//,
      '',
    );

    const bucket = this.configService.get<string>('storage.repository');
    await this.s3Service.upload(key, file.buffer, bucket);

    const signedUrl = await this.s3Service.getSignedUrl(key, bucket);

    challengeFile.url = signedUrl;

    return challengeFile;
  }
}
