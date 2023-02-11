import { IsString, IsUUID, IsPhoneNumber } from "class-validator";

export class CreateWorkerDto {
  @IsString()
  public name: string;
  @IsPhoneNumber()
  public phone: string;
  @IsString()
  public address: string;
}

export class UpdateWorkerDto {
  @IsUUID()
  public id: string;
  @IsString()
  public name?: string;
  @IsPhoneNumber()
  public phone?: string;
  @IsString()
  public address?: string;
}
