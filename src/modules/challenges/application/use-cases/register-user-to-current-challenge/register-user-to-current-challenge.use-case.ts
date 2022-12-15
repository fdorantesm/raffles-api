import { Inject, Injectable, Logger } from '@nestjs/common';
import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@thp/id-generator';
import { DateTime } from 'luxon';
import { ChallengesService } from 'src/modules/challenges/infrastructure/database/services/challenges.services';
import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';

@Injectable()
export class RegisterUserToCurrentChallengeUseCase {
  constructor(
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
    private readonly challengesService: ChallengesService,
    private readonly registrationsService: RegistrationsService,
  ) {}

  public async exec(userId: string) {
    const uuid = this.idGeneratorService.exec();
    const today = DateTime.now().setZone('America/Mazatlan').toJSDate();
    const challenge = await this.challengesService.findCurrentChallenge(today);

    if (!challenge) {
      Logger.log(`No challenge available to join user ${userId}`);
    }

    try {
      await this.registrationsService.create({
        uuid,
        userId,
        challengeId: challenge.uuid,
        isActive: false,
        registeredAt: today,
      });
      Logger.log(
        `User ${userId} joined to ${challenge.uuid}`,
        RegisterUserToCurrentChallengeUseCase.name,
      );
    } catch (error) {
      Logger.error(error.message, RegisterUserToCurrentChallengeUseCase.name);
    }
  }
}
