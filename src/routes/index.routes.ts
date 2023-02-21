import { Router } from "express";
import IndexController from "../controllers/index.controllers";
import { Routes } from "src/interfaces/route.interface";;

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
