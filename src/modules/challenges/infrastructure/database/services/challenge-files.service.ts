import { Injectable } from '@nestjs/common';
import { ChallengeFileEntity } from 'src/modules/challenges/domain/entities/challenge-file.entity';
import { ChallengeFilesRepository } from '../repositories/challenge-files.repository';

@Injectable()
export class ChallengeFilesService {
  constructor(
    private readonly challengeFileRepository: ChallengeFilesRepository,
  ) {}

  public findOne(
    params: Partial<ChallengeFileEntity>,
  ): Promise<ChallengeFileEntity> {
    return this.challengeFileRepository.findOne(params);
  }

  public find(challengeId: string): Promise<ChallengeFileEntity[]> {
    return this.challengeFileRepository.find(challengeId);
  }

  public create(file: ChallengeFileEntity): Promise<ChallengeFileEntity> {
    return this.challengeFileRepository.create(file);
  }

  public async delete(uuid: string): Promise<void> {
    await this.challengeFileRepository.delete(uuid);
  }

  public async findChallengeFileByOptions(filter: any) {
    return this.challengeFileRepository.findChallengeFileByOptions(filter);
  }
}
