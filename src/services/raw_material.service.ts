import { PrismaClient, RawMaterial } from "@prisma/client";
import { isEmpty } from "class-validator";
import {
  CreateRawMaterialDto,
  UpdateRawMaterialDto,
} from "src/dtos/raw_materials.dto";
import { HttpException } from "src/exceptions/httpExceptions";

export class RawMaterialService {
  public rawMaterials = new PrismaClient().rawMaterial;

  public async findAllRawMaterials(
    searchTerm: string = ""
  ): Promise<RawMaterial[]> {
    const allRawMaterials: RawMaterial[] = await this.rawMaterials.findMany({
      include: { Assembly: false },
      where: {
        OR: [
          { name: { contains: searchTerm }, type: { contains: searchTerm } },
        ],
      },
    });
    return allRawMaterials;
  }

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

  public async findRawMaterialById(id: string): Promise<RawMaterial> {
    if (isEmpty(id)) throw new HttpException(400, "Id is empty");

    const findUser: RawMaterial | null = await this.rawMaterials.findUnique({
      where: { id },
    });
    if (!findUser) throw new HttpException(409, "RawMaterial doesn't exist");

    return findUser;
  }

  public async updateRawMaterial(
    rawMaterialdata: UpdateRawMaterialDto
  ): Promise<RawMaterial> {
    if (isEmpty(rawMaterialdata))
      throw new HttpException(400, "userData is empty");

    const findRawMaterial: RawMaterial | null =
      await this.rawMaterials.findUnique({
        where: { id: rawMaterialdata.id },
      });
    if (!findRawMaterial)
      throw new HttpException(409, "Raw Material doesn't exist");

    const updateUserData = await this.rawMaterials.update({
      where: { id: rawMaterialdata.id },
      data: rawMaterialdata,
    });
    return updateUserData;
  }

  public async deleteRawMaterialById(id: string): Promise<RawMaterial> {
    if (isEmpty(id)) throw new HttpException(400, "User doesn't existId");

    const findRawMaterial: RawMaterial | null =
      await this.rawMaterials.findUnique({
        where: { id },
      });
    if (!findRawMaterial) throw new HttpException(409, "User doesn't exist");

    const deleteUserData = await this.rawMaterials.delete({ where: { id } });
    return deleteUserData;
  }
}
