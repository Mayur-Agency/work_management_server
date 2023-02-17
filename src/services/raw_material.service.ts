import { Prisma, RawMaterial } from "@prisma/client";
import { isEmpty } from "class-validator";
import { HttpException } from "src/exceptions/httpExceptions";
import PrismaService from "src/prisma/PrismaService";

export class RawMaterialService {
  public rawMaterials = PrismaService.getPrismaClient().rawMaterial

  public async findAllRawMaterials(
    searchTerm: string = ""
  ): Promise<RawMaterial[]> {
    const allRawMaterials: RawMaterial[] = await this.rawMaterials.findMany({
      where: {
        OR: [
          {
            name: { contains: searchTerm, mode: "insensitive" },
          },
          {
            type: { contains: searchTerm, mode: "insensitive" },
          },
        ],
      },
    });
    return allRawMaterials;
  }

  public async createRawmaterial(
    rawMaterialdata: Prisma.RawMaterialCreateInput
  ): Promise<RawMaterial> {
    if (isEmpty(rawMaterialdata))
      throw new HttpException(400, "raw Material data is empty");
    const { name, quantity, type } = rawMaterialdata;

    const createRawmaterialData: Promise<RawMaterial> =
      this.rawMaterials.create({ data: { name, quantity, type } });

    return createRawmaterialData;
  }

  public async findRawMaterialById(id: string): Promise<RawMaterial> {
    if (isEmpty(id)) throw new HttpException(400, "Id is empty");

    const findRawMaterial: RawMaterial | null =
      await this.rawMaterials.findUnique({
        where: { id },
      });
    if (!findRawMaterial)
      throw new HttpException(409, "RawMaterial doesn't exist");

    return findRawMaterial;
  }

  public async updateRawMaterial(
    rawMaterialdata: Prisma.RawMaterialUpdateInput
  ): Promise<RawMaterial> {
    if (isEmpty(rawMaterialdata))
      throw new HttpException(400, "RawMaterialData is empty");

    const findRawMaterial: RawMaterial | null =
      await this.rawMaterials.findUnique({
        where: { id: rawMaterialdata.id as string },
      });
    if (!findRawMaterial)
      throw new HttpException(409, "Raw Material doesn't exist");

    const updateRawMaterialData = await this.rawMaterials.update({
      where: { id: rawMaterialdata.id as string },
      data: rawMaterialdata,
    });
    return updateRawMaterialData;
  }

  public async deleteRawMaterialById(id: string): Promise<RawMaterial> {
    if (isEmpty(id))
      throw new HttpException(400, "RawMaterial doesn't existId");

    const findRawMaterial: RawMaterial | null =
      await this.rawMaterials.findUnique({
        where: { id },
      });
    if (!findRawMaterial)
      throw new HttpException(409, "RawMaterial doesn't exist");

    const deleteRawMaterialData = await this.rawMaterials.delete({
      where: { id },
    });
    return deleteRawMaterialData;
  }
}
