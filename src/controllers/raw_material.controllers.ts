import { RawMaterial } from "@prisma/client";
import { asyncHandler } from "src/middlewares/async";
import {
  CreateRawMaterialDto,
  UpdateRawMaterialDto,
} from "../dtos/raw_materials.dto";
import { RawMaterialService } from "../services/raw_material.service";

export class RawMaterialController {
  private rawMaterialService = new RawMaterialService();
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
  public updateRawMaterial = asyncHandler(async (req, res, next) => {
    try {
      const rawMaterialData: UpdateRawMaterialDto = req.body;
      const updatedRawMaterialData: RawMaterial =
        await this.rawMaterialService.updateRawmaterial(rawMaterialData);
      res.status(200).json({ success: true, data: updatedRawMaterialData });
    } catch (error) {
      next(error);
    }
  });
}
