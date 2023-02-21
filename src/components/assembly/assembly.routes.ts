import { Router } from "express";
import { Routes } from "src/components/core/route.interface";import { AssemblyController } from "./assembly.controllers";
;

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
