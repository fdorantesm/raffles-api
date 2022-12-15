import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { RegistrationsService } from '../../../infrastructure/database/services/registrations.service';
import { TemplateService } from 'src/modules/shared/services/template.service';
import { EmailService } from 'src/modules/shared/services/email.service';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

@Injectable()
export class SetRegistrationActiveUseCase {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly userService: UsersService,
    private readonly templateService: TemplateService,
    private readonly emailService: EmailService,
  ) {}

  public async exec(userId: string, challengeId: string) {
    const filter = { userId, challengeId };
    const data = { isActive: true };

    const registrationExists = await this.registrationsService.findOne(filter);

    const user = await this.userService.findById(userId);

    if (!registrationExists) {
      throw new NotFoundException('registrations.user_challenge_not_found');
    }

    await this.registrationsService.updateOne(filter, data);

    const templatePath = path.join(
      __dirname.replace(/dist/, ''),
      'static/templates/mailing',
      'challenge-payment-confirmation.pug',
    );

    const templateSource = fs.readFileSync(templatePath).toString('utf8');
    const template = this.templateService.render(templateSource);

    try {
      await this.emailService.send(
        'Tu inscripción al reto está confirmada | The Healthy Program',
        [user.email],
        template,
      );
    } catch (error) {
      console.error(error);
    }
  }
}
