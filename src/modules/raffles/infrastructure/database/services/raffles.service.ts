import { Injectable } from '@nestjs/common';

import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { RaffleEntity } from 'src/modules/raffles/domain/entities/raffle.entity';
import { RafflesRepository } from '../repositories/raffles.repository';

@Injectable()
export class RafflesService implements CrudRepository<RaffleEntity> {
  constructor(private readonly rafflesRepository: RafflesRepository) {}

  public create(data: RaffleEntity): RaffleEntity | Promise<RaffleEntity> {
    return this.rafflesRepository.create(data);
  }

  public find(
    filter: Partial<RaffleEntity>,
  ): RaffleEntity[] | Promise<RaffleEntity[]> {
    return this.rafflesRepository.find(filter);
  }

  public findOne(
    filter: Partial<RaffleEntity>,
  ): RaffleEntity | Promise<RaffleEntity> {
    return this.rafflesRepository.findOne(filter);
  }

  public update(
    filter: Partial<RaffleEntity>,
    data: Partial<RaffleEntity>,
  ): RaffleEntity | Promise<RaffleEntity> {
    return this.rafflesRepository.update(filter, data);
  }

  public delete(filter: Partial<RaffleEntity>): Promise<boolean> {
    return this.rafflesRepository.delete(filter);
  }
}
