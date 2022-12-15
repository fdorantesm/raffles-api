import { Injectable } from '@nestjs/common';
import { UseCase } from 'libs/domain/src';

import { RaffleStatus } from 'src/modules/raffles/domain/enums/raffle-status.enum';
import { RafflesService } from 'src/modules/raffles/infrastructure/database/services/raffles.service';

@Injectable()
export class CancelRaffleUseCase implements UseCase {
  constructor(private readonly rafflesService: RafflesService) {}

  public async run(raffleId: string): Promise<any> {
    const raffle = await this.rafflesService.update(
      { uuid: raffleId },
      { status: RaffleStatus.CANCELLED },
    );

    return raffle;
  }
}
