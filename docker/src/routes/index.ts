import { Router } from "express";
import auth from "./auth.routes";
import user from "./user.routes";
import person from "./person.routes";
import assets from "./assets.routes";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/person", person);
routes.use("/assets", assets);

export default routes;