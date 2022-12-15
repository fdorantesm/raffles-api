import { IsString } from 'class-validator';

export class CreatePlayListDto {
  @IsString()
  public name: string;
}
