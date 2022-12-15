import { ChallengeEntity } from './../../../domain/entities/challenge.entity';
import { RegistrationEntity } from 'src/modules/challenges/domain/entities/registration.entity';
export type RegistrationWithChallenge = RegistrationEntity & {
  challenge: ChallengeEntity;
};
