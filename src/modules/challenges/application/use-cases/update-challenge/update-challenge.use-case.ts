import { Injectable } from '@nestjs/common';

import { ChallengeEntity } from '../../../domain/entities/challenge.entity';
import { ChallengesService } from '../../../infrastructure/database/services/challenges.services';

@Injectable()
export class UpdateChallengeUseCase {
  constructor(private readonly challengesRepository: ChallengesService) {}

  public async exec(
    uuid: string,
    data: Partial<ChallengeEntity>,
  ): Promise<ChallengeEntity> {
    return await this.challengesRepository.updateById(
      uuid,
      new ChallengeEntity(
        uuid,
        data.name,
        data.playlistId,
        data.startsAt,
        data.endsAt,
        data.isActive,
        data.opensAt,
      ),
    );
  }
}
