import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChallengeFileEntity } from 'src/modules/challenges/domain/entities/challenge-file.entity';
import { ChallengeFilesService } from 'src/modules/challenges/infrastructure/database/services/challenge-files.service';
import { S3Service } from 'src/modules/shared/services/s3.service';

@Injectable()
export class ListChallengeFilesUseCase {
  constructor(
    private readonly challengeFilesService: ChallengeFilesService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(challengeId: string): Promise<ChallengeFileEntity[]> {
    const bucket = this.configService.get<string>('storage.repository');
    const files = await this.challengeFilesService.find(challengeId);

    for (const file of files) {
      const key = file.url.replace(
        /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//,
        '',
      );
      const signedUrl = await this.s3Service.getSignedUrl(key, bucket);
      file.url = signedUrl;
    }

    return files;
  }
}
