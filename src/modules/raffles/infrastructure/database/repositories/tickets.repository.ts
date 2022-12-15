import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { TicketEntity } from 'src/modules/raffles/domain/entities/ticket.entity';
import { TicketModel } from '../models/ticket.model';

@Injectable()
export class TicketsRepository implements CrudRepository<TicketEntity> {
  constructor(
    @InjectModel(TicketModel.name)
    private readonly model: PaginateModel<TicketModel>,
  ) {}
  public async create(data: TicketEntity): Promise<TicketEntity> {
    const ticket = await this.model.create(data);
    if (ticket) {
      return TicketEntity.create(ticket);
    }
  }
  public async find(filter: Partial<TicketEntity>): Promise<TicketEntity[]> {
    const tickets = await this.model.find(filter).exec();
    if (tickets.length > 0) {
      return tickets.map((raffle) => TicketEntity.create(raffle));
    }
  }

  public async findOne(filter: Partial<TicketEntity>): Promise<TicketEntity> {
    const ticket = await this.model.findOne(filter).exec();
    if (ticket) {
      return TicketEntity.create(ticket);
    }
  }

  public async update(
    filter: Partial<TicketEntity>,
    data: Partial<TicketEntity>,
  ): Promise<TicketEntity> {
    const ticket = await this.model.updateOne(filter, data).exec();
    if (ticket) {
      return this.findOne(filter);
    }
  }

  public async delete(filter: Partial<TicketEntity>): Promise<boolean> {
    const ticket = await this.model.deleteOne(filter).exec();
    return ticket.deletedCount > 0 ? true : false;
  }
}
