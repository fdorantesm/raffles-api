import { IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class UploadVideosDto {
  @IsUUID()
  public playlistId: string;

  @IsOptional()
  @IsPositive()
  public order?: number;

  @IsOptional()
  @IsString()
  public description?: string;
}
