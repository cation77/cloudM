import { Router } from "express";
import authenticate from "@/middlewares/authenticate";
import authRouter from "./auth";
import userRouter from "./user";
import projectRouter from "./project";
import documentRouter from "./document";
import exceptionRouter from "./exception";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/exception", exceptionRouter);
rootRouter.use("/user", authenticate, userRouter);
rootRouter.use("/project", authenticate, projectRouter);
rootRouter.use("/document", authenticate, documentRouter);

export default rootRouter;
