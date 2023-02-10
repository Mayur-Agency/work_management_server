import { PrismaClient, RawMaterial } from "@prisma/client";
import { isEmpty } from "class-validator";
import { CreateRawMaterialDto } from "src/dtos/raw_materials.dto";
import { HttpException } from "src/exceptions/httpExceptions";
export class RawMaterialService {
  public rawMaterials = new PrismaClient().rawMaterial;
  public async createRawmaterial(
    rawMaterialdata: CreateRawMaterialDto
  ): Promise<RawMaterial> {
    if (isEmpty(rawMaterialdata))
      throw new HttpException(400, "raw Material data is empty");
    const { name, quantity, type } = rawMaterialdata;
    const createRawmaterialData: Promise<RawMaterial> =
      this.rawMaterials.create({ data: { name, quantity, type } });

    return createRawmaterialData;
  }
}
