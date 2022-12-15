import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChallengeEntity } from '../../../domain/entities/challenge.entity';
import { ChallengeModel } from '../models/challenge.model';

@Injectable()
export class ChallengesRepository {
  constructor(
    @InjectModel(ChallengeModel.name)
    private readonly challengeModel: Model<ChallengeModel>,
  ) {}

  public async create(
    challengeEntity: ChallengeEntity,
  ): Promise<ChallengeEntity> {
    const challenge = await this.challengeModel.create<ChallengeEntity>(
      challengeEntity,
    );

    return new ChallengeEntity(
      challenge.uuid,
      challenge.name,
      challenge.playlistId,
      challenge.startsAt,
      challenge.endsAt,
      challenge.isActive,
      challenge.opensAt,
    );
  }

  public async findById(uuid: string): Promise<ChallengeEntity> {
    const challenge = await this.challengeModel.findOne<ChallengeEntity>({
      uuid,
    });
    if (challenge) {
      return new ChallengeEntity(
        challenge.uuid,
        challenge.name,
        challenge.playlistId,
        challenge.startsAt,
        challenge.endsAt,
        challenge.isActive,
        challenge.opensAt,
      );
    }
  }

  public async find(
    filter?: Partial<ChallengeEntity>,
  ): Promise<ChallengeEntity[]> {
    const challenges = await this.challengeModel.find<ChallengeEntity>(filter);

    return challenges.map(
      (challenge) =>
        new ChallengeEntity(
          challenge.uuid,
          challenge.name,
          challenge.playlistId,
          challenge.startsAt,
          challenge.endsAt,
          challenge.isActive,
          challenge.opensAt,
        ),
    );
  }

  public async findNextChallengeByDate(
    startsDate: Date,
  ): Promise<ChallengeEntity> {
    const challenge = await this.challengeModel
      .findOne<ChallengeEntity>({
        startsAt: {
          $lte: startsDate,
        },
      })
      .sort({ startsAt: -1 });

    if (challenge) {
      return new ChallengeEntity(
        challenge.uuid,
        challenge.name,
        challenge.playlistId,
        challenge.startsAt,
        challenge.endsAt,
        challenge.isActive,
        challenge.opensAt,
      );
    }
  }

  public async findCurrentChallenge(today: Date) {
    const challenge = await this.challengeModel
      .findOne({
        opensAt: {
          $lte: today,
        },
        isActive: true,
      })
      .limit(1)
      .sort({
        createdAt: -1,
      });

    return new ChallengeEntity(
      challenge.uuid,
      challenge.name,
      challenge.playlistId,
      challenge.startsAt,
      challenge.endsAt,
      challenge.isActive,
      challenge.opensAt,
    );
  }

  public async updateById(
    uuid: string,
    data: ChallengeEntity,
  ): Promise<ChallengeEntity> {
    await this.challengeModel.updateOne({ uuid }, data);
    return this.findById(uuid);
  }

  public async delete(uuid: string): Promise<void> {
    await this.challengeModel.deleteOne({ uuid });
  }
}
