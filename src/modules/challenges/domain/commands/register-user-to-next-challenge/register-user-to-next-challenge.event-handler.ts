import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { RegisterUserToNextChallengeUseCase } from './../../../application/use-cases/register-user-to-next-challenge/register-user-to-next-challenge.use-case';
import { RegisterUserToNextChallengeCommand } from './register-user-to-next-challenge.command';

@CommandHandler(RegisterUserToNextChallengeCommand)
export class RegisterUserToNextChallengeCommandHandler
  implements ICommandHandler<RegisterUserToNextChallengeCommand>
{
  constructor(
    private readonly registerUserToNextChallengeUseCase: RegisterUserToNextChallengeUseCase,
  ) {}
  public async execute(
    command: RegisterUserToNextChallengeCommand,
  ): Promise<any> {
    try {
      await this.registerUserToNextChallengeUseCase.exec(command.userId);
    } catch (error) {
      Logger.log(error.message, RegisterUserToNextChallengeCommandHandler.name);
    }
  }
}
