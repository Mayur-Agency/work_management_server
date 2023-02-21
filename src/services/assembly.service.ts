import { Assembly, Prisma } from "@prisma/client";
import { AssemblyQueryParams, ICreateAssembly } from "src/interfaces/assembly.interface";
import { HttpException } from "src/exceptions/httpExceptions";
import PrismaService from "src/prisma/PrismaService";
import { isEmpty } from "src/utils/helper.functions";

export class AssemblyService {
  public prisma = PrismaService.getPrismaClient();
  // public async createAssembly({ rawMaterialsArr, workerId }: ICreateAssembly) {
  //   // const createArr = rawMaterialsArr.map((material) => {
  //   //   return {
  //   //     quantity: material.quantity,
  //   //     rawMaterial: { connect: { id: material.id } },
  //   //   };
  //   // });
  //   const assembly = await this.prisma.assembly.create({
  //     data: {
  //       worker_id: { connect: { id: workerId } },
  //       AssemblyRawMaterial: {
  //         create: [{ rawMaterial: { connect: { id: rawMaterialsArr[0].id } } }],
  //       },
  //     },
  //   });
  //   await Promise.all(
  //     rawMaterialsArr.map(async (rawMaterial) => {
  //       const existingRawMaterial = await this.rawMaterials.findUnique({
  //         where: { id: rawMaterial.id },
  //       });

  //       if (!existingRawMaterial) {
  //         throw new Error(`Raw material with id ${rawMaterial.id} not found`);
  //       }

  //       if (existingRawMaterial.quantity < rawMaterial.quantity) {
  //         throw new Error(
  //           `Not enough quantity of raw material with id ${rawMaterial.id}`
  //         );
  //       }

  //       await this.rawMaterials.update({
  //         where: { id: rawMaterial.id },
  //         data: {
  //           quantity: existingRawMaterial.quantity - rawMaterial.quantity,
  //         },
  //       });
  //     })
  //   );

  //   return assembly;
  // }
  /**
   * createRawAssembly
   */
  public async createRawAssembly(assemblyData: ICreateAssembly) {
    const dateAssigned = new Date();
    const assembly = await this.prisma.assembly.create({
      data: {
        dateAssigned,
        dateCompleted: dateAssigned,
        completed: false,
        worker: { connect: { id: assemblyData.workerId } },
      },
    });

    for (const rawMaterial of assemblyData.rawMaterialsArr) {
      await this.prisma.rawMaterialAssembly.create({
        data: {
          assembly: {
            connect: {
              id: assembly.id,
            },
          },
          rawMaterial: {
            connect: {
              id: rawMaterial.id,
            },
          },
          quantity: rawMaterial.quantity,
        },
      });
      await this.prisma.rawMaterial.update({
        where: { id: rawMaterial.id },
        data: { quantity: { decrement: rawMaterial.quantity } },
      });
    }
    return assembly;
  }
  public async findAssemblyById(assemblyId: string): Promise<Assembly> {
    if (isEmpty(assemblyId))
      throw new HttpException(400, "AssemblyId is empty");

    const findAssembly: Assembly | null = await this.prisma.assembly.findUnique(
      {
        where: { id: assemblyId },
        include: {
          worker: true,
          rawMaterialAssemblies: { include: { rawMaterial: true } },
        },
      }
    );
    if (!findAssembly) throw new HttpException(409, "Assembly doesn't exist");

    return findAssembly;
  }

  /**
   * getAllAssembliesWithFilters
   */
  public async getAllAssembliesWithFilters(params: AssemblyQueryParams) {
    const query: Prisma.AssemblyFindManyArgs = {};
    if (params.dateAssigned) {
      query.where = {
        ...query.where,
        dateAssigned: { gte: params.dateAssigned },
      };
    }
    if (params.dateCompleted) {
      query.where = {
        ...query.where,
        dateCompleted: { lte: params.dateCompleted },
      };
    }
    if (params.completed !== undefined) {
      query.where = { ...query.where, completed: params.completed };
    }
    if (params.workerId) {
      query.where = { ...query.where, workerId: params.workerId };
    }
    if (params.rawMaterial) {
      query.where = {
        ...query.where,
        rawMaterialAssemblies: {
          some: {
            rawMaterial: {
              OR: [
                { name: { contains: params.rawMaterial, mode: "insensitive" } },
                { type: { contains: params.rawMaterial, mode: "insensitive" } },
              ],
            },
          },
        },
      };
    }
    const assemblies = await this.prisma.assembly.findMany(query);
    return assemblies;
  }

  public async updateAssembly(
    assemblydata: Prisma.AssemblyUpdateInput
  ): Promise<Assembly> {
    if (isEmpty(assemblydata))
      throw new HttpException(400, "AssemblyData is empty");
    if (assemblydata["completed"] == true) {
      assemblydata.dateCompleted = new Date();
    }
    const findAssembly: Assembly | null = await this.prisma.assembly.findUnique(
      {
        where: { id: assemblydata.id as string },
      }
    );
    if (!findAssembly)
      throw new HttpException(409, "Raw Material doesn't exist");

    const updateAssemblyData = await this.prisma.assembly.update({
      where: { id: assemblydata.id as string },
      data: assemblydata,
    });
    return updateAssemblyData;
  }

  public async deleteAssemblyById(id: string): Promise<Assembly> {
    if (isEmpty(id)) throw new HttpException(400, "Assembly doesn't existId");

    const findAssembly: Assembly | null = await this.prisma.assembly.findUnique(
      {
        where: { id },
      }
    );
    if (!findAssembly) throw new HttpException(409, "Assembly doesn't exist");

    const deleteAssemblyData = await this.prisma.assembly.delete({
      where: { id },
    });
    return deleteAssemblyData;
  }
}
