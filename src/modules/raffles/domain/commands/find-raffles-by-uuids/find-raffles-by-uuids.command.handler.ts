import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RafflesService } from 'src/modules/raffles/infrastructure/database/services/raffles.service';
import { RaffleEntity } from '../../entities/raffle.entity';
import { FindRafflesByUuidsCommand } from './find-raffles-by-uuids.command';

@CommandHandler(FindRafflesByUuidsCommand)
export class FindRafflesByUuidsCommandHandler
  implements ICommandHandler<FindRafflesByUuidsCommand>
{
  constructor(private readonly rafflesService: RafflesService) {}
  public async execute(
    command: FindRafflesByUuidsCommand,
  ): Promise<RaffleEntity[]> {
    const raffles = await this.rafflesService.findByUuids(command.uuids);
    return raffles || [];
  }
}
