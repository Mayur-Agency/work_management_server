import { IsString, IsNumber, IsUUID } from "class-validator";

export class CreateRawMaterialDto {
  @IsString()
  public name: string;
  @IsString()
  public type: string;
  @IsNumber()
  public quantity: number;
}
export class UpdateRawMaterialDto {
  @IsUUID()
  public id: string;
  @IsString()
  public name?: string;
  @IsString()
  public type?: string;
  @IsNumber()
  public quantity?: number;
}
