import { Injectable } from '@nestjs/common';

import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { TicketEntity } from 'src/modules/raffles/domain/entities/ticket.entity';
import { TicketsRepository } from '../repositories/tickets.repository';

@Injectable()
export class TicketsService implements CrudRepository<TicketEntity> {
  constructor(private readonly ticketsRepository: TicketsRepository) {}

  public create(data: TicketEntity): TicketEntity | Promise<TicketEntity> {
    return this.ticketsRepository.create(data);
  }

  public find(
    filter: Partial<TicketEntity>,
  ): TicketEntity[] | Promise<TicketEntity[]> {
    return this.ticketsRepository.find(filter);
  }

  public findOne(
    filter: Partial<TicketEntity>,
  ): TicketEntity | Promise<TicketEntity> {
    return this.ticketsRepository.findOne(filter);
  }

  public update(
    filter: Partial<TicketEntity>,
    data: Partial<TicketEntity>,
  ): TicketEntity | Promise<TicketEntity> {
    return this.ticketsRepository.update(filter, data);
  }

  public delete(filter: Partial<TicketEntity>): Promise<boolean> {
    return this.ticketsRepository.delete(filter);
  }
}
