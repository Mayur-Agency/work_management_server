import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
// import validationMiddleware from "../middlewares/validation.middleware";
import { RawMaterialController } from "src/controllers/raw_material.controllers";
// import { CreateRawMaterialDto } from "src/dtos/raw_materials.dto";

class RawMaterialRoutes implements Routes {
  public path = "/api/v1/raw/";
  public router = Router();
  public rawMaterialontroller = new RawMaterialController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.rawMaterialontroller.createRawMaterial
    );
  }
}

export default RawMaterialRoutes;
