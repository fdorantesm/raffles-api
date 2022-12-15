import { IsString, MaxLength } from 'class-validator';

export class UpdateVideoDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;
}
