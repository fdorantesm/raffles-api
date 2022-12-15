import { RegistrationsService } from './../../../challenges/infrastructure/database/services/registrations.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class GetRegistrationByUuidUseCase {
  constructor(private readonly registrationsService: RegistrationsService) {}

  public async exec(uuid: string, userId: string) {
    const registration = await this.registrationsService.findOne({ uuid });

    if (!registration) {
      throw new NotFoundException('resource.not_found');
    }

    if (registration.userId !== userId) {
      throw new ForbiddenException('auth.forbidden_action');
    }

    return registration;
  }
}
