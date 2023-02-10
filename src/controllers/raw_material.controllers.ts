import { RawMaterial } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { CreateRawMaterialDto } from "../dtos/raw_materials.dto";
import { RawMaterialService } from "../services/raw_material.service";

export class RawMaterialController {
  public rawMaterialService = new RawMaterialService();
  public createRawMaterial = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const rawMaterialData: CreateRawMaterialDto = req.body;
      const createRawMaterialData: RawMaterial =
        await this.rawMaterialService.createRawmaterial(rawMaterialData);
      res.status(201).json({ success: true, data: createRawMaterialData });
    } catch (error) {
      next(error);
    }
  };
}
