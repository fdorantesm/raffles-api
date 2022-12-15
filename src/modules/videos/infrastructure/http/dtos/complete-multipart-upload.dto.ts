import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class CompleteMultipartUploadDto {
  @IsString()
  public uploadId: string;

  @Type(() => PartFileDto)
  @ValidateNested({
    each: true,
  })
  public parts: PartFileDto[];

  @IsString()
  public key: string;
}

class PartFileDto {
  @IsString()
  public eTag: string;

  @IsNumber()
  public partNumber: number;
}
