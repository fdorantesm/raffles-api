import { HttpException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { ChallengesService } from 'src/modules/challenges/infrastructure/database/services/challenges.services';

@Injectable()
export class FindNextChallengeUseCase {
  constructor(private readonly challengesService: ChallengesService) {}

  public async exec() {
    const now = DateTime.now().setZone('America/Mazatlan').toJSDate();
    const challenge = await this.challengesService.findNextChallengeByDate(now);

    if (!challenge) {
      throw new HttpException('challenge.no-next-challenge', 418);
    }

    return challenge;
  }
}
