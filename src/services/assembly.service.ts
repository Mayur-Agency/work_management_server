import { PrismaClient, Assembly, Prisma } from "@prisma/client";
import { isEmpty } from "class-validator";
// import { isEmpty } from "class-validator";
import { HttpException } from "src/exceptions/httpExceptions";
import { ICreateAssembly } from "src/interfaces/assembly.interface";

export class AssemblyService {
  public assemblies = new PrismaClient().assembly;
  public assemblyRawMaterials = new PrismaClient().rawMaterialAssembly;
  public rawMaterials = new PrismaClient().rawMaterial;
  // public async createAssembly({ rawMaterialsArr, workerId }: ICreateAssembly) {
  //   // const createArr = rawMaterialsArr.map((material) => {
  //   //   return {
  //   //     quantity: material.quantity,
  //   //     rawMaterial: { connect: { id: material.id } },
  //   //   };
  //   // });
  //   const assembly = await this.assemblies.create({
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
    const assembly = await this.assemblies.create({
      data: {
        dateAssigned,
        dateCompleted: dateAssigned,
        completed: false,
        worker: { connect: { id: assemblyData.workerId } },
      },
    });

    for (const rawMaterial of assemblyData.rawMaterialsArr) {
      await this.assemblyRawMaterials.create({
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
      await this.rawMaterials.update({
        where: { id: rawMaterial.id },
        data: { quantity: { decrement: rawMaterial.quantity } },
      });
    }
    return assembly;
  }
  public async findAssemblyById(assemblyId: string): Promise<Assembly> {
    if (isEmpty(assemblyId))
      throw new HttpException(400, "AssemblyId is empty");

    const findAssembly: Assembly | null = await this.assemblies.findUnique({
      where: { id: assemblyId },
      include: {
        worker: true,
        rawMaterialAssemblies: { include: { rawMaterial: true } },
      },
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
    if (assemblydata["completed"] == true) {
      assemblydata.dateCompleted = new Date();
    }
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
