import { Router } from "express";
import * as userController from "@/controllers/auth";
import { validate } from "@/middlewares/validate";
import authenticate from "@/middlewares/authenticate";  
import { loginSchema } from "@/schemas/auth.schema";

const router = Router();

router.post("/login", validate(loginSchema), userController.login);
router.post("/logout", authenticate, userController.logout);

export default router;