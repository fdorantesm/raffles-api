import { IsString, Matches } from 'class-validator';

export class CreateUploadIdDto {
  @IsString()
  path: string;

  @IsString()
  @Matches(/video\/mp4|video\/quicktime/)
  contentType: string;
}
