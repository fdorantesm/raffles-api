import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { RegisterUserToChallengeCommand } from './register-user-to-challenge.command';
import { RegisterUserToCurrentChallengeUseCase } from 'src/modules/challenges/application/use-cases/register-user-to-current-challenge/register-user-to-current-challenge.use-case';

@CommandHandler(RegisterUserToChallengeCommand)
export class RegisterUserToChallengeCommandHandler
  implements ICommandHandler<RegisterUserToChallengeCommand>
{
  constructor(
    private readonly registerUserToCurrentChallengeUseCase: RegisterUserToCurrentChallengeUseCase,
  ) {}
  public async execute(command: RegisterUserToChallengeCommand): Promise<any> {
    try {
      await this.registerUserToCurrentChallengeUseCase.exec(command.userId);
    } catch (error) {
      Logger.log(error.message, RegisterUserToChallengeCommandHandler.name);
    }
  }
}
