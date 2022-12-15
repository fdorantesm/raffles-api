import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsNumber,
  IsPositive,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Sex } from 'src/modules/challenges/domain/enums/sex.enum';

import { Modality } from './../../../../challenges/domain/enums/modality.enum';

export class RegisterProfile {
  @ApiProperty({ example: 'Juan Hernández' })
  @IsString()
  public name: string;

  @ApiProperty({ example: '+525555555555' })
  @IsString()
  public phone: string;

  @ApiProperty({ example: 24 })
  @IsNumber()
  @IsPositive()
  @IsInt()
  public age: number;

  @ApiProperty({ example: 100 })
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  public weight: number;

  @ApiProperty({ example: 180 })
  @IsNumber()
  @IsPositive()
  @IsInt()
  public height: number;

  @ApiProperty({ example: 'Querétaro' })
  @IsString()
  public city: string;

  @ApiProperty({ example: 'jhdezhdz8705' })
  @IsString()
  @IsOptional()
  public instagram: string;

  @ApiProperty({ example: 'j.hdez.hdz' })
  @IsString()
  @IsOptional()
  public facebook: string;

  @ApiProperty({ example: 'Casec, Creatina' })
  @IsString()
  @IsOptional()
  public supplements: string;

  @ApiProperty({ example: 'nuts' })
  @IsString()
  @IsOptional()
  public ailments: string;

  @ApiProperty({ example: 'instagram' })
  @IsString()
  public origin: string;

  @ApiProperty({ example: '30 minutos diarios' })
  @IsString()
  @IsOptional()
  public exercise: string;

  @ApiProperty({ example: 'Pollo y huevo' })
  @IsOptional()
  @IsString()
  public food: string;

  @ApiProperty({ example: 'LOSE_WEIGHT' })
  @IsEnum(Modality)
  public modality: Modality;

  @ApiProperty({ example: 'FEMALE' })
  @IsEnum(Sex)
  public sex: Sex;
}
