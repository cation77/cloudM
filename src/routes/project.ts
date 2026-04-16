import { Router } from "express";
import * as projectController from "@/controllers/project";
import { validate } from "@/middlewares/validate";
import { createProjectSchema } from "@/schemas/project.schema";

const router = Router();

router.get("/all", projectController.getProjects);
router.get("/info/:id", projectController.getProjectById);
router.post("/create", validate(createProjectSchema), projectController.createProject);

export default router;