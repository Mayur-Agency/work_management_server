import { Assembly, Prisma } from "@prisma/client";
import { HttpException } from "src/exceptions/httpExceptions";
import { asyncHandler } from "src/middlewares/async";

import { AssemblyService } from "../services/assembly.service";

export class AssemblyController {
  public assemblyService = new AssemblyService();

  public createAssembly = asyncHandler(async (req, res, next) => {
    try {
      const assemblyData: Prisma.AssemblyCreateInput = req.body;
      const createAssemblyData: Assembly =
        await this.assemblyService.createAssembly(assemblyData);
      res.status(201).json({ success: true, data: createAssemblyData });
    } catch (error) {
      next(error);
    }
  });
  public findAllAssemblies = asyncHandler(async (req, res, next) => {
    try {
      const { searchTerm } = req.query;
      if (searchTerm && typeof searchTerm !== "string") {
        return next(new HttpException(400, `SearchTerm has to be a string`));
      }
      const assemblyData: Assembly[] =
        await this.assemblyService.findAllAssemblies();
      res.status(200).json({
        success: true,
        data: assemblyData,
        count: assemblyData.length,
      });
    } catch (error) {
      next(error);
    }
  });
  public findAssemblyById = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const assemblyData: Assembly =
        await this.assemblyService.findAssemblyById(id);
      res.status(200).json({ success: true, data: assemblyData });
    } catch (error) {
      next(error);
    }
  });
  public updateAssembly = asyncHandler(async (req, res, next) => {
    try {
      const assemblyData: Prisma.AssemblyUpdateInput = req.body;
      const updatedAssemblyData: Assembly =
        await this.assemblyService.updateAssembly(assemblyData);
      res.status(200).json({ success: true, data: updatedAssemblyData });
    } catch (error) {
      next(error);
    }
  });
  public deleteAssemblyById = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const assemblyData: Assembly =
        await this.assemblyService.deleteAssemblyById(id);
      res.status(204).json({ success: true, data: assemblyData });
    } catch (error) {
      next(error);
    }
  });
}
