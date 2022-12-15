import { IdGeneratorService, ID_GENERATOR_SERVICE } from '@thp/id-generator';
import { Inject, Injectable } from '@nestjs/common';

import { PlaylistsService } from '../../../../videos/infrastructure/database/services/playlist.service';
import { ChallengeEntity } from '../../../domain/entities/challenge.entity';
import { ChallengesService } from '../../../infrastructure/database/services/challenges.services';
import { PlaylistEntity } from 'src/modules/videos/domain/entities/playlist.entity';
import { CreateChallengePayload } from './create-challenge.payload';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { RegisterUserToNextChallengeCommand } from 'src/modules/challenges/domain/commands/register-user-to-next-challenge';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { CreatedChallengeEvent } from 'src/modules/challenges/domain/events/created-challenge/created-challenge.event';
import { DateTime } from 'luxon';

@Injectable()
export class CreateChallengeUseCase {
  constructor(
    private readonly challengesRepository: ChallengesService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
    private readonly playlistsService: PlaylistsService,
    private readonly eventBus: EventBus,
  ) {}

  public async exec(challengePayload: CreateChallengePayload): Promise<any> {
    const { name, startsAt, endsAt } = challengePayload;
    const uuid = this.idGeneratorService.exec();
    const playListId = this.idGeneratorService.exec();

    const playlist = await this.playlistsService.create(
      new PlaylistEntity(playListId, challengePayload.name),
    );

    const opensAt = DateTime.fromJSDate(startsAt).minus({ days: 3 }).toJSDate();

    const challenge = await this.challengesRepository.create(
      new ChallengeEntity(
        uuid,
        name,
        playlist.uuid,
        startsAt,
        endsAt,
        false,
        opensAt,
      ),
    );

    this.eventBus.publish(new CreatedChallengeEvent(challenge.uuid));

    return challenge;
  }
}
