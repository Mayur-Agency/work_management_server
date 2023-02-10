import { IsString, IsNumber } from "class-validator";

export class CreateRawMaterialDto {
  @IsString()
  public name: string;
  @IsString()
  public type: string;
  @IsNumber()
  public quantity: number;
}
