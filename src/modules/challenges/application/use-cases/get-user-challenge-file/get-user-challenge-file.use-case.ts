import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Modality } from 'src/modules/challenges/domain/enums/modality.enum';
import { Sex } from 'src/modules/challenges/domain/enums/sex.enum';
import { ChallengeFilesService } from 'src/modules/challenges/infrastructure/database/services/challenge-files.service';
import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';
import { ChallengeFileOptions } from 'src/modules/challenges/infrastructure/database/types/challenge-file-options.type';
import { ThresholdLimit } from 'src/modules/challenges/infrastructure/database/types/challenge-file-threshold-limit.enum';
import { S3Service } from 'src/modules/shared/services/s3.service';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Injectable()
export class GetUserChallengeFileUseCase {
  constructor(
    private readonly challengeFileService: ChallengeFilesService,
    private readonly usersService: UsersService,
    private readonly registrationsService: RegistrationsService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(userId: string, challengeId: string) {
    const user = await this.usersService.findById(userId);
    const registration = await this.registrationsService.findOne({
      userId,
      challengeId,
    });

    const sex = user.profile.sex;
    const modality = user.profile.modality;
    const underBmi = registration.bmi < 33;

    let filter: Partial<ChallengeFileOptions> = {
      sex,
      modality,
    };

    if (modality === Modality.LOSE_WEIGHT && sex === Sex.FEMALE) {
      filter = {
        ...filter,
        thresholdLimit: underBmi ? ThresholdLimit.UNDER : ThresholdLimit.OVER,
        bmiThreshold: 33,
        protein: registration.withProtein,
      };
    }

    const parsedFilter: any = {};

    Object.keys(filter).map((key) => {
      parsedFilter[`options.${key}`] = filter[key];
    });

    const file = await this.challengeFileService.findChallengeFileByOptions({
      ...parsedFilter,
      challengeId,
    });

    if (!file) {
      throw new NotFoundException('menu.not_found');
    }

    const bucket = this.configService.get<string>('storage.repository');

    const key = file.url.replace(/^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '');

    file.url = await this.s3Service.getSignedUrl(key, bucket);

    return file;
  }
}
