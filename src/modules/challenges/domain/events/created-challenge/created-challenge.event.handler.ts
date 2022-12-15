import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

import { RegisterUserToNextChallengeCommand } from '../../commands/register-user-to-next-challenge';
import { CreatedChallengeEvent } from './created-challenge.event';

@EventsHandler(CreatedChallengeEvent)
export class RegisterAllUsersToChallengeEventHandler
  implements IEventHandler<CreatedChallengeEvent>
{
  constructor(private readonly userService: UsersService) {}
  public async handle(_event: CreatedChallengeEvent): Promise<void> {
    const users = await this.userService.findCustomers({});
    users.map((user) => new RegisterUserToNextChallengeCommand(user.uuid));
  }
}
