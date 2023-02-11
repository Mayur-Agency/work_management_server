import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { WorkerController } from "src/controllers/worker.controllers";

class WorkerRoutes implements Routes {
  public path = "/api/v1/worker/";
  public router = Router();
  public workerontroller = new WorkerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const {
      createWorker,
      deleteWorkerById,
      findAllWorkers,
      findWorkerById,
      updateWorker,
    } = this.workerontroller;
    this.router.route(this.path).get(findAllWorkers).post(createWorker);
    this.router
      .route(this.path + ":id")
      .get(findWorkerById)
      .delete(deleteWorkerById)
      .put(updateWorker);
  }
}

export default WorkerRoutes;
