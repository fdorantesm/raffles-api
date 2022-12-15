import { S3Service } from 'src/modules/shared/services/s3.service';
import { Injectable } from '@nestjs/common';

import { ChallengeEntity } from '../../../domain/entities/challenge.entity';
import { ChallengesService } from '../../../infrastructure/database/services/challenges.services';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetChallengeUseCase {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(uuid: string): Promise<ChallengeEntity> {
    const challenge = await this.challengesService.findById(uuid);
    const bucket = this.configService.get<string>('storage.repository');
    return challenge;
  }
}
