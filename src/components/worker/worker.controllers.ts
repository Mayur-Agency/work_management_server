import { Worker } from "@prisma/client";
import { HttpException } from "src/exceptions/httpExceptions";
import { asyncHandler } from "src/middlewares/async";
import { parseBoolean } from "src/utils/helper.functions";
import { CreateWorkerDto, UpdateWorkerDto } from "./workers.interface";
import { WorkerService } from "./worker.service";

export class WorkerController {
  public workerService = new WorkerService();

  public createWorker = asyncHandler(async (req, res, next) => {
    try {
      const workerData: CreateWorkerDto = req.body;
      const createWorkerData: Worker = await this.workerService.createWorker(
        workerData
      );
      res.status(201).json({ success: true, data: createWorkerData });
    } catch (error) {
      next(error);
    }
  });
  public findAllWorkers = asyncHandler(async (req, res, next) => {
    try {
      const { searchTerm } = req.query;
      if (searchTerm && typeof searchTerm !== "string") {
        return next(new HttpException(400, `SearchTerm has to be a string`));
      }
      const workerData: Worker[] = await this.workerService.findAllWorkers(
        searchTerm as string
      );
      res.status(200).json({
        success: true,
        data: workerData,
        count: workerData.length,
      });
    } catch (error) {
      next(error);
    }
  });
  public findWorkerById = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { assemblies, completedAssemblies } = req.query;
      const completed = parseBoolean(
        completedAssemblies ? (completedAssemblies as string) : "false"
      );
      const includeAssembly = parseBoolean(
        assemblies ? (assemblies as string) : "false"
      );
      const workerData: Worker = await this.workerService.findWorkerById({
        workerId: id,
        includeAssembly,
        completed,
      });
      res.status(200).json({ success: true, data: workerData });
    } catch (error) {
      next(error);
    }
  });
  public updateWorker = asyncHandler(async (req, res, next) => {
    try {
      const workerData: UpdateWorkerDto = req.body;
      const updatedWorkerData: Worker = await this.workerService.updateWorker(
        workerData
      );
      res.status(200).json({ success: true, data: updatedWorkerData });
    } catch (error) {
      next(error);
    }
  });
  public deleteWorkerById = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const workerData: Worker = await this.workerService.deleteWorkerById(id);
      res.status(204).json({ success: true, data: workerData });
    } catch (error) {
      next(error);
    }
  });
}
