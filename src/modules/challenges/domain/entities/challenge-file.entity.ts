import { ChallengeFileOptions } from '../../infrastructure/database/types/challenge-file-options.type';

export class ChallengeFileEntity {
  constructor(
    public uuid: string,
    public name: string,
    public challengeId: string,
    public url: string,
    public options: ChallengeFileOptions,
  ) {}

  static create({ uuid, name, challengeId, url, options }) {
    return new ChallengeFileEntity(uuid, name, challengeId, url, options);
  }
}
