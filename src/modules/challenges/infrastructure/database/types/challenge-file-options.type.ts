import { Modality } from 'src/modules/challenges/domain/enums/modality.enum';
import { Sex } from 'src/modules/challenges/domain/enums/sex.enum';
import { ThresholdLimit } from './challenge-file-threshold-limit.enum';

export type ChallengeFileOptions = {
  modality: Modality;
  sex: Sex;
  protein: boolean;
  bmiThreshold: number;
  thresholdLimit: ThresholdLimit;
};
