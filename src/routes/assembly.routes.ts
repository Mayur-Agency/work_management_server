import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { AssemblyController } from "src/controllers/assembly.controllers";

class AssemblyRoutes implements Routes {
  public path = "/api/v1/assembly/";
  public router = Router();
  public workerontroller = new AssemblyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const {
      createAssembly,
      deleteAssemblyById,
      findAllAssemblies,
      findAssemblyById,
      updateAssembly,
    } = this.workerontroller;
    this.router.route(this.path).get(findAllAssemblies).post(createAssembly);
    this.router
      .route(this.path + ":id")
      .get(findAssemblyById)
      .delete(deleteAssemblyById)
      .put(updateAssembly);
  }
}

export default AssemblyRoutes;
