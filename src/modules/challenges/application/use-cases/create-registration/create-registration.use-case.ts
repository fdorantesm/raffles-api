import { ChallengesService } from './../../../infrastructure/database/services/challenges.services';
import { RegistrationsService } from './../../../infrastructure/database/services/registrations.service';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { RegistrationEntity } from 'src/modules/challenges/domain/entities/registration.entity';
import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@thp/id-generator';

@Injectable()
export class CreateRegistrationUseCase {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly challengesService: ChallengesService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public async exec(userId: string, challengeId: string) {
    await this.validateChallenge(challengeId);
    await this.validatePreviousRegistration(challengeId, userId);

    const uuid = this.idGeneratorService.exec();
    const registeredAt = new Date();
    const isActive = false;

    const registration = await this.registrationsService.create(
      new RegistrationEntity(
        uuid,
        userId,
        challengeId,
        registeredAt,
        undefined,
        undefined,
        isActive,
      ),
    );

    return registration;
  }

  private async validateChallenge(challengeId: string): Promise<void> {
    const challengeExists = await this.challengesService.findById(challengeId);

    if (!challengeExists) {
      throw new NotFoundException('challenges.not_found');
    }
  }

  private async validatePreviousRegistration(
    challengeId: string,
    userId: string,
  ): Promise<void> {
    const registrionExists = await this.registrationsService.findOne({
      challengeId,
      userId,
    });

    if (registrionExists) {
      throw new ConflictException('registration.user_already_registered');
    }
  }
}
