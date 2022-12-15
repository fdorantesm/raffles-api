import { Injectable } from '@nestjs/common';
import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Injectable()
export class UpdateRegistrationUseCase {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly usersService: UsersService,
  ) {}

  public async exec(uuid: string, data: any) {
    const registration = await this.registrationsService.findOne({ uuid });
    const user = await this.usersService.findById(registration.userId);
    const height = user.profile.height;
    const weight = data.weight;
    const bmi = weight / (height / 100) ** 2;
    const modality = data.modality;
    await this.registrationsService.updateOne(
      { uuid },
      {
        ...data,
        bmi,
        height,
        weight,
        modality,
      },
    );

    await this.usersService.updateProfile(user.uuid, { weight, modality });
  }
}
