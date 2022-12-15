import { Injectable } from '@nestjs/common';

import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { PrizeEntity } from 'src/modules/raffles/domain/entities/prize.entity';
import { PrizesRepository } from '../repositories/prizes.repository';

@Injectable()
export class PrizesService implements CrudRepository<PrizeEntity> {
  constructor(private readonly prizesRepository: PrizesRepository) {}

  public create(data: PrizeEntity): PrizeEntity | Promise<PrizeEntity> {
    return this.prizesRepository.create(data);
  }

  public find(
    filter: Partial<PrizeEntity>,
  ): PrizeEntity[] | Promise<PrizeEntity[]> {
    return this.prizesRepository.find(filter);
  }

  public findOne(
    filter: Partial<PrizeEntity>,
  ): PrizeEntity | Promise<PrizeEntity> {
    return this.prizesRepository.findOne(filter);
  }

  public update(
    filter: Partial<PrizeEntity>,
    data: Partial<PrizeEntity>,
  ): PrizeEntity | Promise<PrizeEntity> {
    return this.prizesRepository.update(filter, data);
  }

  public delete(filter: Partial<PrizeEntity>): Promise<boolean> {
    return this.prizesRepository.delete(filter);
  }
}
