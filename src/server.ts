import App from "./app";
import AssemblyRoutes from "./components/assembly/assembly.routes";
import IndexRoutes from "./components/core/index.routes";
import RawMaterialRoutes from "./components/rawMaterial/raw_material.routes";
import WorkerRoutes from "./components/worker/worker.routes";

const app = new App([
  new IndexRoutes(),
  new RawMaterialRoutes(),
  new WorkerRoutes(),
  new AssemblyRoutes(),
]);

app.listen();
