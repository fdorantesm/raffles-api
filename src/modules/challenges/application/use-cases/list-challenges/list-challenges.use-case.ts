import { Injectable } from '@nestjs/common';
import { ChallengeEntity } from '../../../domain/entities/challenge.entity';
import { ChallengesService } from '../../../infrastructure/database/services/challenges.services';

@Injectable()
export class ListChallengesUseCase {
  constructor(private readonly challengesRepository: ChallengesService) {}

  public async exec(
    challengeEntity?: ChallengeEntity,
  ): Promise<ChallengeEntity[]> {
    return await this.challengesRepository.find(challengeEntity);
  }
}
