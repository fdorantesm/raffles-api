import { Injectable } from '@nestjs/common';

import { ChallengesService } from './../../../infrastructure/database/services/challenges.services';

@Injectable()
export class FindCurrentChallengeUseCase {
  constructor(private readonly challengesService: ChallengesService) {}

  public async exec(date: Date) {
    const challenge = await this.challengesService.find();
  }
}
