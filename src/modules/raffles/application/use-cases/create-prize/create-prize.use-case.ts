import { Inject, Injectable } from '@nestjs/common';
import { ID_GENERATOR_SERVICE, UuidGeneratorService } from '@thp/id-generator';

import { UseCase } from 'libs/domain/src';
import { PrizeEntity } from 'src/modules/raffles/domain/entities/prize.entity';
import { PrizesService } from 'src/modules/raffles/infrastructure/database/services/prizes.service';
import { CreatePrizeRequestDto } from 'src/modules/raffles/infrastructure/http/dtos/create-prize.request-dto';

@Injectable()
export class CreatePrizeUseCase implements UseCase {
  constructor(
    private readonly prizesService: PrizesService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly uuidGeneratorService: UuidGeneratorService,
  ) {}
  public async run(data: CreatePrizeRequestDto): Promise<any> {
    const uuid = this.uuidGeneratorService.exec();
    const { name, description, imageUrls } = data;
    return await this.prizesService.create(
      PrizeEntity.create({
        uuid,
        name,
        description,
        imageUrls,
      }),
    );
  }
}
