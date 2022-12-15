import {
  IdGeneratorService,
  ID_GENERATOR_SERVICE,
} from './../../../../../../libs/id-generator/src/id-generator.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { RegistrationsService } from './../../../infrastructure/database/services/registrations.service';
import { ChallengesService } from './../../../infrastructure/database/services/challenges.services';
import { RegistrationEntity } from 'src/modules/challenges/domain/entities/registration.entity';
import { DateTime } from 'luxon';

@Injectable()
export class RegisterUserToNextChallengeUseCase {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly registrationsService: RegistrationsService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public async exec(userId: string) {
    const today = DateTime.now().setZone('America/Mazatlan').toJSDate();
    const nextChallenge = await this.challengesService.findNextChallengeByDate(
      today,
    );

    const uuid = this.idGeneratorService.exec();

    if (!nextChallenge) {
      throw new NotFoundException('challenges.no-next-challenge-found');
    }

    const isActive = false;

    return await this.registrationsService.create(
      RegistrationEntity.create({
        uuid: uuid,
        userId: userId,
        challengeId: nextChallenge.uuid,
        registeredAt: DateTime.now().toJSDate(),
        isActive,
      }),
    );
  }
}
