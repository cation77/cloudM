import { Router } from "express";
import { AdminOnly, StaffOnly } from "@/middlewares/guards";
import * as userController from "@/controllers/user";
import { validate } from "@/middlewares/validate";
import {
  UserIdSchema,
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
} from "@/schemas/user.schema";

const router = Router();

router.get("/list", AdminOnly, userController.list);
router.post(
  "/create",
  AdminOnly,
  validate(createUserSchema),
  userController.createUser,
);
router.delete(
  "/delete",
  AdminOnly,
  validate(UserIdSchema),
  userController.deleteUser,
);
router.put(
  "/edit",
  StaffOnly,
  validate(updateUserSchema),
  userController.updateUser,
);
router.get("/info", StaffOnly, validate(UserIdSchema), userController.userInfo);
router.post(
  "/changePassword",
  StaffOnly,
  validate(changePasswordSchema),
  userController.changePassword,
);

export default router;
