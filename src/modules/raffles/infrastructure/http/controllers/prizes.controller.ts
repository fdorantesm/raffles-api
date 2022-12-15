import { Body, Controller, Post } from '@nestjs/common';
import { CreatePrizeUseCase } from 'src/modules/raffles/application/use-cases/create-prize/create-prize.use-case';
import { CreatePrizeRequestDto } from '../dtos/create-prize.request-dto';

@Controller({
  version: '1',
  path: 'prizes',
})
export class PrizesController {
  constructor(private readonly createPrizeUseCase: CreatePrizeUseCase) {}

  @Post('/')
  public createPrize(@Body() body: CreatePrizeRequestDto) {
    return this.createPrizeUseCase.run(body);
  }
}
