import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreatePrizeRequestDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @ValidateNested()
  @IsString({
    each: true,
  })
  public imageUrls?: string[];
}
