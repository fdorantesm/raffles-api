import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChallengesService } from 'src/modules/challenges/infrastructure/database/services/challenges.services';
import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';
import { S3Service } from 'src/modules/shared/services/s3.service';

@Injectable()
export class GetPendingChallengeUseCase {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly registrationsService: RegistrationsService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(userId: string) {
    const now = new Date();
    const registration =
      await this.registrationsService.findPendingRegistrationForDate(
        userId,
        now,
      );

    if (!registration) {
      throw new NotFoundException('resource.not_found');
    }

    const challenge = await this.challengesService.findById(
      registration.challengeId,
    );

    const bucket = this.configService.get<string>('storage.repository');

    registration.challenge = challenge;

    return registration;
  }
}
