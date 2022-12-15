import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { PrizeEntity } from 'src/modules/raffles/domain/entities/prize.entity';
import { PrizeModel } from '../models/prize.model';

@Injectable()
export class PrizesRepository implements CrudRepository<PrizeEntity> {
  constructor(
    @InjectModel(PrizeModel.name)
    private readonly model: PaginateModel<PrizeModel>,
  ) {}
  public async create(data: PrizeEntity): Promise<PrizeEntity> {
    const prize = await this.model.create(data);
    if (prize) {
      return PrizeEntity.create(prize);
    }
  }
  public async find(filter: Partial<PrizeEntity>): Promise<PrizeEntity[]> {
    const prizes = await this.model.find(filter).exec();
    if (prizes.length > 0) {
      return prizes.map((raffle) => PrizeEntity.create(raffle));
    }
  }

  public async findOne(filter: Partial<PrizeEntity>): Promise<PrizeEntity> {
    const prize = await this.model.findOne(filter).exec();
    if (prize) {
      return PrizeEntity.create(prize);
    }
  }

  public async update(
    filter: Partial<PrizeEntity>,
    data: Partial<PrizeEntity>,
  ): Promise<PrizeEntity> {
    const prize = await this.model.updateOne(filter, data).exec();
    if (prize) {
      return this.findOne(filter);
    }
  }

  public async delete(filter: Partial<PrizeEntity>): Promise<boolean> {
    const prize = await this.model.deleteOne(filter).exec();
    return prize.deletedCount > 0 ? true : false;
  }
}
