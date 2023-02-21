import App from "./app";
import AssemblyRoutes from "./components/assembly/assembly.routes";
import RawMaterialRoutes from "./components/rawMaterial/raw_material.routes";
import IndexRoutes from "./routes/index.routes";
import WorkerRoutes from "./routes/worker.routes";

const app = new App([
  new IndexRoutes(),
  new RawMaterialRoutes(),
  new WorkerRoutes(),
  new AssemblyRoutes(),
]);

app.listen();
