import { ChallengeEntity } from './../../../domain/entities/challenge.entity';
import { ChallengesRepository } from '../repositories/challenges.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ChallengesService {
  constructor(private readonly challengesRepository: ChallengesRepository) {}

  public async create(
    challengeEntity: ChallengeEntity,
  ): Promise<ChallengeEntity> {
    const challenge = await this.challengesRepository.create(challengeEntity);
    return challenge;
  }

  public async findById(uuid: string): Promise<ChallengeEntity> {
    const challenge = await this.challengesRepository.findById(uuid);
    // TODO Service shouldn't have exceptions
    if (!challenge) {
      throw new NotFoundException('resource.not_found');
    }
    return challenge;
  }

  public async find(
    filter?: Partial<ChallengeEntity>,
  ): Promise<ChallengeEntity[]> {
    const challenges = await this.challengesRepository.find(filter);
    return challenges;
  }

  public async updateById(
    uuid: string,
    data: ChallengeEntity,
  ): Promise<ChallengeEntity> {
    const challenge = this.findById(uuid);
    if (!challenge) {
      throw new NotFoundException('resource.not_found');
    }
    return await this.challengesRepository.updateById(uuid, data);
  }

  public async delete(uuid: string): Promise<void> {
    await this.findById(uuid);
    return await this.challengesRepository.delete(uuid);
  }

  public findNextChallengeByDate(date: Date): Promise<ChallengeEntity> {
    return this.challengesRepository.findNextChallengeByDate(date);
  }

  public findCurrentChallenge(today: Date) {
    return this.challengesRepository.findCurrentChallenge(today);
  }
}
