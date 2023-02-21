import { Router } from "express";
import { Routes } from "src/interfaces/route.interface";;
// import validationMiddleware from "../middlewares/validation.middleware";
import { RawMaterialController } from "src/controllers/raw_material.controllers";
// import { CreateRawMaterialDto } from "src/dtos/raw_materials.interface";

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
      groupRawMaterialByType
    } = this.rawMaterialontroller;
    this.router
      .route(this.path)
      .get(findAllRawMaterials)
      .post(createRawMaterial);
      this.router.get(this.path + 'group/type',groupRawMaterialByType)
    this.router
      .route(this.path + ":id")
      .get(findRawMaterialById)
      .delete(deleteRawMaterialById)
      .put(updateRawMaterial);
  }
}

export default RawMaterialRoutes;
