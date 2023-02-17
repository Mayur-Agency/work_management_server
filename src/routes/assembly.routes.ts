import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { AssemblyController } from "src/controllers/assembly.controllers";

class AssemblyRoutes implements Routes {
  public path = "/api/v1/assembly/";
  public router = Router();
  public assemblyontroller = new AssemblyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const {
      createAssembly,
      deleteAssemblyById,
      findAssemblyById,
      updateAssembly,
      getAllAssembliesWithFilters,
    } = this.assemblyontroller;
    this.router
      .route(this.path)
      .get(getAllAssembliesWithFilters)
      .post(createAssembly);
    this.router
      .route(this.path + ":id")
      .get(findAssemblyById)
      .delete(deleteAssemblyById)
      .put(updateAssembly);
  }
}

export default AssemblyRoutes;
