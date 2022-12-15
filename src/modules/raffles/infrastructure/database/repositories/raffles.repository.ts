import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { RaffleEntity } from 'src/modules/raffles/domain/entities/raffle.entity';
import { RaffleModel } from '../models/raffle.model';

@Injectable()
export class RafflesRepository implements CrudRepository<RaffleEntity> {
  constructor(
    @InjectModel(RaffleModel.name)
    private readonly model: PaginateModel<RaffleModel>,
  ) {}

  public async create(data: RaffleEntity): Promise<RaffleEntity> {
    const raffle = await this.model.create(data);
    if (raffle) {
      return RaffleEntity.create(raffle);
    }
  }

  public async find(filter: Partial<RaffleEntity>): Promise<RaffleEntity[]> {
    const raffles = await this.model.find(filter).exec();
    if (raffles.length > 0) {
      return raffles.map((raffle) => RaffleEntity.create(raffle));
    }
  }

  public async findByUuids(uuids: string[]): Promise<RaffleEntity[]> {
    const raffles = await this.model
      .find({
        uuid: {
          $in: uuids,
        },
      })
      .exec();
    if (raffles.length > 0) {
      return raffles.map((raffle) => RaffleEntity.create(raffle));
    }
  }

  public async findOne(filter: Partial<RaffleEntity>): Promise<RaffleEntity> {
    const raffle = await this.model.findOne(filter).exec();
    if (raffle) {
      return RaffleEntity.create(raffle);
    }
  }

  public async update(
    filter: Partial<RaffleEntity>,
    data: Partial<RaffleEntity>,
  ): Promise<RaffleEntity> {
    const raffle = await this.model.updateOne(filter, data).exec();
    if (raffle) {
      return this.findOne(filter);
    }
  }

  public async delete(filter: Partial<RaffleEntity>): Promise<boolean> {
    const raffle = await this.model.deleteOne(filter).exec();
    return raffle.deletedCount > 0 ? true : false;
  }
}
