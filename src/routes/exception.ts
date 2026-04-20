import { Router } from "express";
import * as exceptionController from "@/controllers/exception";
import authenticate from "@/middlewares/authenticate";
import { validate } from "@/middlewares/validate";
import { QuerySchema } from "@/schemas/exception.schema";

const router = Router();

router.post("/report", exceptionController.report);
router.get(
  "/list",
  authenticate,
  validate(QuerySchema),
  exceptionController.list,
);

export default router;
