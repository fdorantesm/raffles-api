import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { Modality } from 'src/modules/challenges/domain/enums/modality.enum';
import { Sex } from 'src/modules/challenges/domain/enums/sex.enum';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsPhoneNumber()
  @IsOptional()
  public phone?: string;

  @IsPositive()
  @IsOptional()
  public age?: number;

  @IsPositive()
  @IsOptional()
  public weight?: number;

  @IsPositive()
  @IsOptional()
  public height?: number;

  @IsString()
  @Length(1, 32)
  @IsOptional()
  public city?: string;

  @IsString()
  @Length(1, 32)
  @IsOptional()
  public instagram?: string;

  @IsString()
  @Length(1, 32)
  @IsOptional()
  public facebook?: string;

  @IsString()
  @IsOptional()
  public supplements?: string;

  @IsString()
  @IsOptional()
  public ailments?: string;

  @IsString()
  @IsOptional()
  public origin?: string;

  @IsString()
  @IsOptional()
  public exercise?: string;

  @IsString()
  @IsOptional()
  public food?: string;

  @IsEnum(Modality)
  @IsOptional()
  public modality?: Modality;

  @IsEnum(Sex)
  @IsOptional()
  public sex?: Sex;
}
