import { Injectable, NotFoundException } from '@nestjs/common';

import { RegistrationEntity } from 'src/modules/challenges/domain/entities/registration.entity';
import { ChallengesService } from 'src/modules/challenges/infrastructure/database/services/challenges.services';
import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';

@Injectable()
export class GetRegistrationUseCase {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly challengesService: ChallengesService,
  ) {}

  public async exec(
    userId: string,
    challengeId: string,
  ): Promise<RegistrationEntity> {
    await this.validateChallenge(challengeId);

    const registration = await this.registrationsService.findOne({
      userId,
      challengeId,
    });

    if (!registration) {
      throw new NotFoundException('registrations.user_challenge_not_found');
    }
    return registration;
  }

  private async validateChallenge(challengeId: string): Promise<void> {
    const challengeExists = await this.challengesService.findById(challengeId);

    if (!challengeExists) {
      throw new NotFoundException('challenges.not_found');
    }
  }
}
