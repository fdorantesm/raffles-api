import { Injectable, NotFoundException } from '@nestjs/common';

import { ChallengesService } from 'src/modules/challenges/infrastructure/database/services/challenges.services';
import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';

@Injectable()
export class GetRegistrationWithChallengeByUserIdAndChallengeIdUseCase {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly challengesService: ChallengesService,
  ) {}

  public async exec(userId: string, challengeId: string) {
    await this.validateChallenge(challengeId);

    const registration =
      await this.registrationsService.getRegistrationWithChallengeByUserIdAndChallengeId(
        userId,
        challengeId,
      );

    return registration;
  }

  private async validateChallenge(challengeId: string): Promise<void> {
    const challengeExists = await this.challengesService.findById(challengeId);
    if (!challengeExists) {
      throw new NotFoundException('challenges.not_found');
    }
  }
}
