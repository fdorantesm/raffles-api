import { Injectable } from '@nestjs/common';

import { ChallengesService } from '../../../infrastructure/database/services/challenges.services';

@Injectable()
export class DeleteChallengeUseCase {
  constructor(private readonly challengesRepository: ChallengesService) {}

  public async exec(uuid: string): Promise<void> {
    await this.challengesRepository.delete(uuid);
  }
}
