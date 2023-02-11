import { PrismaClient, Assembly, Prisma } from "@prisma/client";
import { isEmpty } from "class-validator";
import { HttpException } from "src/exceptions/httpExceptions";

export class AssemblyService {
  public assemblies = new PrismaClient().assembly;
  public createAssembly(
    assemblyData: Prisma.AssemblyCreateInput
  ): Promise<Assembly> {
    console.log(assemblyData);
    if (isEmpty(assemblyData)) {
      throw new HttpException(400, "raw Material data is empty");
    }
    const createAssemblyData: Promise<Assembly> = this.assemblies.create({
      data: assemblyData,
    });
    return createAssemblyData;
  }
  public async findAssemblyById(assemblyId: string): Promise<Assembly> {
    if (isEmpty(assemblyId))
      throw new HttpException(400, "AssemblyId is empty");

    const findAssembly: Assembly | null = await this.assemblies.findUnique({
      where: { id: assemblyId },
    });
    if (!findAssembly) throw new HttpException(409, "Assembly doesn't exist");

    return findAssembly;
  }

  public async findAllAssemblies(): Promise<Assembly[]> {
    const allAssemblies: Assembly[] = await this.assemblies.findMany();

    return allAssemblies;
  }

  public async updateAssembly(
    assemblydata: Prisma.AssemblyUpdateInput
  ): Promise<Assembly> {
    if (isEmpty(assemblydata))
      throw new HttpException(400, "AssemblyData is empty");

    const findAssembly: Assembly | null = await this.assemblies.findUnique({
      where: { id: assemblydata.id as string },
    });
    if (!findAssembly)
      throw new HttpException(409, "Raw Material doesn't exist");

    const updateAssemblyData = await this.assemblies.update({
      where: { id: assemblydata.id as string },
      data: assemblydata,
    });
    return updateAssemblyData;
  }

  public async deleteAssemblyById(id: string): Promise<Assembly> {
    if (isEmpty(id)) throw new HttpException(400, "Assembly doesn't existId");

    const findAssembly: Assembly | null = await this.assemblies.findUnique({
      where: { id },
    });
    if (!findAssembly) throw new HttpException(409, "Assembly doesn't exist");

    const deleteAssemblyData = await this.assemblies.delete({ where: { id } });
    return deleteAssemblyData;
  }
}
