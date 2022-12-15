import { RegisterUserToNextChallengeCommand } from './../../../challenges/domain/commands/register-user-to-next-challenge/register-user-to-next-challenge.command';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CommandBus } from '@nestjs/cqrs';

import { TemplateService } from './../../../shared/services/template.service';
import { EmailService } from './../../../shared/services/email.service';
import { ShortIdService } from './../../../shared/services/short-id.service';
import { ProfileEntity } from './../../../users/domain/entities/profile.entity';
import { TokenDto } from './../dtos/token.dto';
import { UserEntity } from './../../../users/domain/entities/user.entity';
import { TokenService } from './../services/token.service';
import { UsersService } from '../../../users/infrastructure/database/services/users.service';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { DateTime } from 'luxon';
import * as capitalize from 'lodash/capitalize';
import { RegisterUserToChallengeCommand } from 'src/modules/challenges/domain/commands/register-user-to-challenge/register-user-to-challenge.command';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly shortIdService: ShortIdService,
    private readonly emailService: EmailService,
    private readonly templateService: TemplateService,
    private readonly commandBus: CommandBus,
  ) {}

  public async exec(
    email: string,
    password?: string,
    profile?: ProfileEntity,
  ): Promise<{ user: UserEntity } & TokenDto> {
    const isNotFirst = await this.usersService.findOne({});
    const subscriber = [Scope.MENU, Scope.WORKOUTS];
    const scopes = isNotFirst ? subscriber : [Scope.ROOT, ...subscriber];

    const genericPasswordDate = DateTime.now()
      .setZone('America/Mazatlan')
      .setLocale('es')
      .toFormat('MMMM.dd');

    const genericPassword = capitalize(genericPasswordDate);
    const passwordFallback =
      password || genericPassword || this.shortIdService.exec(8);

    const templateData = { password: passwordFallback };
    const templatePath = path.join(
      __dirname.replace(/dist/, ''),
      'static/templates/mailing',
      'register.pug',
    );

    const templateSource = fs.readFileSync(templatePath).toString('utf8');
    const template = this.templateService.render(templateSource, templateData);

    const formatedEmail = email.toLowerCase();

    const user = await this.usersService.register(
      formatedEmail,
      passwordFallback,
      scopes,
      profile,
    );

    this.commandBus.execute(new RegisterUserToChallengeCommand(user.uuid));

    try {
      await this.emailService.send(
        'Bienvenid@ a The Healthy Program',
        [formatedEmail],
        template,
      );
    } catch (error) {
      console.error(error);
    }

    const token = await this.tokenService.create({
      scopes,
      id: user.uuid,
    });

    return {
      ...token,
      user,
    };
  }
}
