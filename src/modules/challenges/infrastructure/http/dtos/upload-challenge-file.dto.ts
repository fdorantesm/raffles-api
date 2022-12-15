import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { Modality } from 'src/modules/challenges/domain/enums/modality.enum';
import { Sex } from 'src/modules/challenges/domain/enums/sex.enum';
import { ThresholdLimit } from '../../database/types/challenge-file-threshold-limit.enum';

export class UploadChallengeFileDto {
  @IsString()
  public name: string;

  @IsEnum(Modality)
  public modality: Modality;

  @IsEnum(Sex)
  public sex: Sex;

  @IsBooleanString()
  @IsOptional()
  public protein?: boolean;

  @IsNumberString()
  @IsOptional()
  public bmiThreshold?: number;

  @IsEnum(ThresholdLimit)
  @IsOptional()
  public thresholdLimit?: ThresholdLimit;
}
