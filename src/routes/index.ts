import { Router } from "express";
import authenticate from "@/middlewares/authenticate";
import authRouter from "./auth";
import userRouter from "./user";
import projectRouter from "./project";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", authenticate, userRouter);
rootRouter.use("/project", authenticate, projectRouter);

export default rootRouter;
