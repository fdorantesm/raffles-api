import { IsNumberString, IsString, IsUUID, Matches } from 'class-validator';

export class UploadVideoPartDto {
  @Matches(
    /videos\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/.*/,
  )
  public fileId: string;

  @IsString()
  public uploadId: string;

  @IsNumberString()
  public partNumber: string;

  @IsUUID()
  public playlistId: string;
}
