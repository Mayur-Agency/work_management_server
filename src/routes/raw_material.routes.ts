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
    const {
      createRawMaterial,
      deleteRawMaterialById,
      findAllRawMaterials,
      findRawMaterialById,
      updateRawMaterial,
    } = this.rawMaterialontroller;
    this.router
      .route(this.path)
      .get(findAllRawMaterials)
      .post(createRawMaterial);
    this.router
      .route(this.path + ":id")
      .get(findRawMaterialById)
      .delete(deleteRawMaterialById)
      .put(updateRawMaterial);
  }
}

export default RawMaterialRoutes;
