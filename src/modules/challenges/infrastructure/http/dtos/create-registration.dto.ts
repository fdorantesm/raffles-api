import { IsUUID } from 'class-validator';

export class CreateRegistrationDto {
  @IsUUID()
  public userId: string;

  @IsUUID()
  public challengeId: string;
}
