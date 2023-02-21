import { Router } from "express";
import { Routes } from "src/components/core/route.interface";import IndexController from "./index.controllers";
;

class IndexRoutes implements Routes {
  public path = "/";
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoutes;
