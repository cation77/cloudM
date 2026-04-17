import { Router } from "express";
import { AdminOnly, StaffOnly } from "@/middlewares/guards";
import * as userController from "@/controllers/user";
import { validate } from "@/middlewares/validate";
import {
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
} from "@/schemas/user.schema";
import { QueryIdSchema, PaginationSchema } from "@/schemas/common.schema";

const router = Router();

router.get("/list", AdminOnly, validate(PaginationSchema), userController.list);
router.post(
  "/create",
  AdminOnly,
  validate(createUserSchema),
  userController.createUser,
);
router.delete(
  "/delete",
  AdminOnly,
  validate(QueryIdSchema),
  userController.deleteUser,
);
router.put(
  "/edit",
  StaffOnly,
  validate(updateUserSchema),
  userController.updateUser,
);
router.get(
  "/info",
  StaffOnly,
  validate(QueryIdSchema),
  userController.userInfo,
);
router.post(
  "/changePassword",
  StaffOnly,
  validate(changePasswordSchema),
  userController.changePassword,
);

export default router;
