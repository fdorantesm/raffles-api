import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class UpdateChallengeDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  public playlistId?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  public startsAt?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  public endsAt?: Date;
}
