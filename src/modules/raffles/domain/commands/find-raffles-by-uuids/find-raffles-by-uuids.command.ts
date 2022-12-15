import { ICommand } from '@nestjs/cqrs';

export class FindRafflesByUuidsCommand implements ICommand {
  constructor(public uuids: string[]) {}
}
