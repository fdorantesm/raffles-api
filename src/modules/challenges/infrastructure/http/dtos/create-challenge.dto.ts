import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  public name: string;

  @IsDate()
  @Type(() => Date)
  public startsAt: Date;

  @IsDate()
  @Type(() => Date)
  public endsAt: Date;
}
