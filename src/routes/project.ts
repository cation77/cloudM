import { Router } from "express";
import * as projectController from "@/controllers/project";
import { StaffOnly } from "@/middlewares/guards";
import { validate } from "@/middlewares/validate";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/schemas/project.schema";
import { QueryIdSchema, PaginationSchema } from "@/schemas/common.schema";

const router = Router();

router.get("/list", validate(PaginationSchema), projectController.list);
router.get("/info", validate(QueryIdSchema), projectController.getProject);
router.post(
  "/create",
  StaffOnly,
  validate(createProjectSchema),
  projectController.createProject,
);
router.put(
  "/edit",
  StaffOnly,
  validate(updateProjectSchema),
  projectController.updateProject,
);
router.delete(
  "/delete",
  StaffOnly,
  validate(QueryIdSchema),
  projectController.deleteProject,
);

export default router;
