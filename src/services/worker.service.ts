import { PrismaClient, Worker, Prisma } from "@prisma/client";
import { isEmpty } from "class-validator";
import { HttpException } from "src/exceptions/httpExceptions";
import { FindWorkerByIdArgs } from "src/interfaces/service.interface";

export class WorkerService {
  public workers = new PrismaClient().worker;
  public createWorker(workerData: Prisma.WorkerCreateInput): Promise<Worker> {
    if (isEmpty(workerData)) {
      throw new HttpException(400, "raw Material data is empty");
    }
    const createWorkerData: Promise<Worker> = this.workers.create({
      data: workerData,
    });
    return createWorkerData;
  }
  public async findWorkerById({
    workerId,
    includeAssembly = false,
    completed = false,
  }: FindWorkerByIdArgs): Promise<Worker> {
    if (!workerId) {
      throw new HttpException(400, "WorkerId is empty");
    }
    const query: Prisma.WorkerFindUniqueArgs = {
      where: { id: workerId },
    };

    if (includeAssembly) {
      if (!completed) {
        query.include = {
          ...query.include,
          assemblies: {
            where: { completed: false },
          },
        };
      } else {
      query.include = { assemblies: true };
      }
    }
    const worker = await this.workers.findUnique(query);

    if (!worker) {
      throw new HttpException(404, "Worker not found");
    }

    return worker;
  }

  public async findAllWorkers(searchTerm: string = ""): Promise<Worker[]> {
    const allWorkers: Worker[] = await this.workers.findMany({
      where: {
        name: { contains: searchTerm, mode: "insensitive" },
      },
      // include: { Assembly: false },
    });

    return allWorkers;
  }

  public async updateWorker(
    workerdata: Prisma.WorkerUpdateInput
  ): Promise<Worker> {
    if (isEmpty(workerdata))
      throw new HttpException(400, "WorkerData is empty");

    const findWorker: Worker | null = await this.workers.findUnique({
      where: { id: workerdata.id as string },
    });
    if (!findWorker) throw new HttpException(409, "Raw Material doesn't exist");

    const updateWorkerData = await this.workers.update({
      where: { id: workerdata.id as string },
      data: workerdata,
    });
    return updateWorkerData;
  }

  public async deleteWorkerById(id: string): Promise<Worker> {
    if (isEmpty(id)) throw new HttpException(400, "Worker doesn't existId");

    const findWorker: Worker | null = await this.workers.findUnique({
      where: { id },
    });
    if (!findWorker) throw new HttpException(409, "Worker doesn't exist");

    const deleteWorkerData = await this.workers.delete({ where: { id } });
    return deleteWorkerData;
  }
}
