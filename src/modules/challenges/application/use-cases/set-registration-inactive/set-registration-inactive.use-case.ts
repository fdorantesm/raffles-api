import { Injectable, NotFoundException } from '@nestjs/common';

import { RegistrationsService } from './../../../infrastructure/database/services/registrations.service';

@Injectable()
export class SetRegistrationInactiveUseCase {
  constructor(private readonly registrationsService: RegistrationsService) {}

  public async exec(userId: string, challengeId: string) {
    const filter = { userId, challengeId };
    const data = { isActive: false };

    const registrationExists = await this.registrationsService.findOne(filter);

    if (!registrationExists) {
      throw new NotFoundException('registrations.user_challenge_not_found');
    }

    await this.registrationsService.updateOne(filter, data);
  }
}
