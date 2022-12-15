import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { Modality } from '../enums/modality.enum';
import { ChallengeEntity } from './challenge.entity';
export class RegistrationEntity {
  constructor(
    public uuid: string,
    public userId: string,
    public challengeId: string,
    public registeredAt: Date,
    public isActive: boolean,
    public bmi?: number,
    public withProtein?: boolean,
    public height?: number,
    public weight?: number,
    public challenge?: ChallengeEntity,
    public wireTransferReceiptUrl?: string,
    public user?: UserEntity,
    public modality?: Modality,
  ) {}

  static create({
    uuid,
    userId,
    challengeId,
    registeredAt,
    bmi,
    withProtein,
    height,
    weight,
    isActive,
    challenge,
    wireTransferReceiptUrl,
    user,
    modality,
  }: {
    uuid: string;
    userId: string;
    challengeId: string;
    registeredAt: Date;
    isActive: boolean;
    bmi?: number;
    withProtein?: boolean;
    height?: number;
    weight?: number;
    wireTransferReceiptUrl?: string;
    challenge?: ChallengeEntity;
    user?: UserEntity;
    modality?: Modality;
  }) {
    return new RegistrationEntity(
      uuid,
      userId,
      challengeId,
      registeredAt,
      isActive,
      bmi,
      withProtein,
      height,
      weight,
      challenge,
      wireTransferReceiptUrl,
      user,
      modality,
    );
  }
}
