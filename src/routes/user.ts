import { Router } from "express";
import * as userController from "@/controllers/user";
import { validate } from "@/middlewares/validate";
import { createUserSchema } from "@/schemas/user.schema";

const router = Router();

router.get("/list", userController.list);
router.post("/register", validate(createUserSchema), userController.register);


export default router;