export class CreateRawMaterialDto {
  name: string;
  type: string;
  quantity: number;
}
export class UpdateRawMaterialDto {
  id: string;
  name?: string;
  type?: string;
  quantity?: number;
}
