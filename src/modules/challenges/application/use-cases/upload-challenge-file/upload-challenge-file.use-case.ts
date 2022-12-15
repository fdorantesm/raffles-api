import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File } from '@thp/common/types/general/file.type';
import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';
import { ChallengeFilesRepository } from 'src/modules/challenges/infrastructure/database/repositories/challenge-files.repository';
import { S3Service } from 'src/modules/shared/services/s3.service';
import { ShortIdService } from 'src/modules/shared/services/short-id.service';
import { SlugService } from 'src/modules/shared/services/slug.service';

@Injectable()
export class UploadChallengeFileUseCase {
  constructor(
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
    private readonly challengeFilesRepository: ChallengeFilesRepository,
    private readonly s3Service: S3Service,
    private readonly slugService: SlugService,
    private readonly configService: ConfigService,
    private readonly shortIdService: ShortIdService,
  ) {}

  public async exec(data, file: File) {
    const bucket = this.configService.get<string>('storage.repository');
    const uuid = this.idGeneratorService.exec();
    const extension = file.originalname.split('.').pop();
    const shortId = this.shortIdService.exec();
    const slug = this.slugService.exec(
      file.originalname.replace(`.${extension}`, ''),
    );

    const fileUrl = await this.s3Service.upload(
      `menus/${data.challengeId}/${slug}-${shortId}.${extension}`,
      file.buffer,
      bucket,
    );

    const challengeFile = await this.challengeFilesRepository.create({
      uuid,
      name: data.name,
      challengeId: data.challengeId,
      url: fileUrl,
      options: {
        modality: data.modality,
        sex: data.sex,
        thresholdLimit: data.thresholdLimit || undefined,
        bmiThreshold: Number(data.bmiThreshold) || undefined,
        protein: data.protein ? data.protein === 'true' : undefined,
      },
    });

    return challengeFile;
  }
}
