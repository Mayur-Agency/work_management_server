import { RawMaterial } from "@prisma/client";
import { HttpException } from "src/exceptions/httpExceptions";
import { asyncHandler } from "src/middlewares/async";
import {
  CreateRawMaterialDto,
  UpdateRawMaterialDto,
} from "./raw_materials.interface";
import { RawMaterialService } from "./raw_material.service";

export class RawMaterialController {
  public rawMaterialService = new RawMaterialService();

  public createRawMaterial = asyncHandler(async (req, res, next) => {
    try {
      const rawMaterialData: CreateRawMaterialDto = req.body;
      const createRawMaterialData: RawMaterial =
        await this.rawMaterialService.createRawmaterial(rawMaterialData);
      res.status(201).json({ success: true, data: createRawMaterialData });
    } catch (error) {
      next(error);
    }
  });
  public groupRawMaterialByType = asyncHandler(async (_req, res, next) => {
    try {
      const rawMaterialData =
        await this.rawMaterialService.groupRawMaterialByType();
      res.status(200).json({
        success: true,
        count: rawMaterialData.length,
        data: rawMaterialData,
      });
    } catch (error) {
      next(error);
    }
  });
  public findAllRawMaterials = asyncHandler(async (req, res, next) => {
    try {
      const { searchTerm } = req.query;
      if (searchTerm && typeof searchTerm !== "string") {
        return next(new HttpException(400, `SearchTerm has to be a string`));
      }
      const rawMaterialData: RawMaterial[] =
        await this.rawMaterialService.findAllRawMaterials(searchTerm as string);
      res.status(200).json({
        success: true,
        data: rawMaterialData,
        count: rawMaterialData.length,
      });
    } catch (error) {
      next(error);
    }
  });
  public findRawMaterialById = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const rawMaterialData: RawMaterial =
        await this.rawMaterialService.findRawMaterialById(id);
      res.status(200).json({ success: true, data: rawMaterialData });
    } catch (error) {
      next(error);
    }
  });
  public updateRawMaterial = asyncHandler(async (req, res, next) => {
    try {
      const rawMaterialData: UpdateRawMaterialDto = req.body;
      const updatedRawMaterialData: RawMaterial =
        await this.rawMaterialService.updateRawMaterial(rawMaterialData);
      res.status(200).json({ success: true, data: updatedRawMaterialData });
    } catch (error) {
      next(error);
    }
  });
  public deleteRawMaterialById = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const rawMaterialData: RawMaterial =
        await this.rawMaterialService.deleteRawMaterialById(id);
      res.status(204).json({ success: true, data: rawMaterialData });
    } catch (error) {
      next(error);
    }
  });
}
