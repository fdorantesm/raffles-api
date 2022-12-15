import {
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateRaffleRequestDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsPositive()
  public price: number;

  @IsPositive()
  @IsInt()
  public ticketsQuantity: number;

  @IsUUID()
  public prizeId: string;

  @IsUrl()
  public raffleUrl: string;

  @IsDateString()
  public raffleDate: Date;
}
