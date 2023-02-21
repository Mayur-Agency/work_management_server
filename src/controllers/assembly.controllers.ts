import { Assembly, Prisma } from "@prisma/client";
import { ICreateAssembly } from "src/dtos/assembly.dto";
import { asyncHandler } from "src/middlewares/async";
// import qs from 'qs'
import { AssemblyService } from "../services/assembly.service";

export class AssemblyController {
  public assemblyService = new AssemblyService();

  public createAssembly = asyncHandler(async (req, res, next) => {
    try {
      const assemblyData: ICreateAssembly = req.body;
      const createAssemblyData: Assembly =
        await this.assemblyService.createRawAssembly(assemblyData);
      res.status(201).json({ success: true, data: createAssemblyData });
    } catch (error) {
      next(error);
    }
  });
  /**
   * getAllAssembliesWithFilters
   */
  public getAllAssembliesWithFilters = asyncHandler(async (req, res, next) => {
    try {
      const query = req.query;
      const assemblyData =
        await this.assemblyService.getAllAssembliesWithFilters(query);
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
