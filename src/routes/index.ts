import { Router } from "express";
import projectRouter from "./project";

const rootRouter = Router();

rootRouter.use("/project", projectRouter);

export default rootRouter;
