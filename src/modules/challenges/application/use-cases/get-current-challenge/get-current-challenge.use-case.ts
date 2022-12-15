import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';
import { ChallengesService } from 'src/modules/challenges/infrastructure/database/services/challenges.services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class GetCurrentChallengeUseCase {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly registrationsService: RegistrationsService,
  ) {}

  public async exec(userId: string) {
    const now = DateTime.now().setZone('America/Mazatlan').toJSDate();
    const registration = await this.registrationsService.findActiveRegistration(
      userId,
      now,
    );

    if (!registration) {
      throw new NotFoundException();
    }

    const challenge = await this.challengesService.findById(
      registration.challengeId,
    );

    return challenge;
  }
}
