import App from "./app";
import IndexRoutes from "./routes/index.routes";
import RawMaterialRoutes from "./routes/raw_material.routes";
import WorkerRoutes from "./routes/worker.routes";

const app = new App([
  new IndexRoutes(),
  new RawMaterialRoutes(),
  new WorkerRoutes(),
]);

app.listen();
