import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChallengeFileEntity } from 'src/modules/challenges/domain/entities/challenge-file.entity';
import { ChallengeFileModel } from '../models/challenge-file.model';

@Injectable()
export class ChallengeFilesRepository {
  constructor(
    @InjectModel(ChallengeFileModel.name)
    private readonly challengeFileModel: Model<ChallengeFileModel>,
  ) {}

  public async findOne(
    params: Partial<ChallengeFileEntity>,
  ): Promise<ChallengeFileEntity> {
    const file = await this.challengeFileModel.findOne(params);
    if (file) {
      return ChallengeFileEntity.create(file);
    }
  }

  public async find(challengeId: string): Promise<ChallengeFileEntity[]> {
    const files = await this.challengeFileModel.find({ challengeId });
    return files.map(ChallengeFileEntity.create);
  }

  public async create(file: ChallengeFileEntity): Promise<ChallengeFileEntity> {
    const challengeFile = await this.challengeFileModel.create(file);
    return ChallengeFileEntity.create(challengeFile);
  }

  public async delete(uuid: string): Promise<boolean> {
    const result = await this.challengeFileModel.deleteOne({ uuid }).exec();
    return result.deletedCount > 0;
  }

  public async findChallengeFileByOptions(filter: any) {
    const file = await this.challengeFileModel.findOne(filter);
    if (file) {
      return ChallengeFileEntity.create(file);
    }
  }
}
