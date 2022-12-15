import { IsBoolean, IsEnum, IsPositive } from 'class-validator';
import { Modality } from 'src/modules/challenges/domain/enums/modality.enum';

export class UpdateRegistrationDto {
  @IsPositive()
  public weight: number;

  @IsBoolean()
  public withProtein: boolean;

  @IsEnum(Modality)
  public modality: Modality;
}
