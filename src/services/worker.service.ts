import { PrismaClient, Worker, Prisma } from "@prisma/client";
import { isEmpty } from "class-validator";
import { HttpException } from "src/exceptions/httpExceptions";

export class WorkerService {
  public workers = new PrismaClient().worker;
  public createWorker(workerData: Prisma.WorkerCreateInput): Promise<Worker> {
    console.log(workerData)
    if (isEmpty(workerData)) {
      throw new HttpException(400, "raw Material data is empty");
    }
    const createWorkerData: Promise<Worker> = this.workers.create({
      data: workerData,
    });
    return createWorkerData;
  }
  public async findWorkerById(workerId: string): Promise<Worker> {
    if (isEmpty(workerId)) throw new HttpException(400, "WorkerId is empty");

    const findWorker: Worker | null = await this.workers.findUnique({
      where: { id: workerId },
    });
    if (!findWorker) throw new HttpException(409, "Worker doesn't exist");

    return findWorker;
  }

  public async findAllWorkers(searchTerm: string = ""): Promise<Worker[]> {
    console.log(searchTerm);
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

    const findWorker: Worker | null =
      await this.workers.findUnique({
        where: { id: workerdata.id as string },
      });
    if (!findWorker)
      throw new HttpException(409, "Raw Material doesn't exist");

    const updateWorkerData = await this.workers.update({
      where: { id: workerdata.id as string },
      data: workerdata,
    });
    return updateWorkerData;
  }

  public async deleteWorkerById(id: string): Promise<Worker> {
    if (isEmpty(id)) throw new HttpException(400, "Worker doesn't existId");

    const findWorker: Worker | null =
      await this.workers.findUnique({
        where: { id },
      });
    if (!findWorker) throw new HttpException(409, "Worker doesn't exist");

    const deleteWorkerData = await this.workers.delete({ where: { id } });
    return deleteWorkerData;
  }
}
