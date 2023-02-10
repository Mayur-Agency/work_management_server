import App from "./app";
import IndexRoutes from "./routes/index.routes";
import RawMaterialRoutes from "./routes/raw_material.routes";

const app = new App([new IndexRoutes(), new RawMaterialRoutes()]);

app.listen();
