import { Router } from "express";
import * as documentController from "@/controllers/document";
import { StaffOnly } from "@/middlewares/guards";
import { validate } from "@/middlewares/validate";
import { multerHandler } from "@/middlewares/multerHandler";
import {
  PathSchema,
  RenameSchema,
  ProjectPathSchema,
} from "@/schemas/document.schema";

const router = Router();

router.get("/list", StaffOnly, validate(PathSchema), documentController.list);

router.post(
  "/rename",
  StaffOnly,
  validate(RenameSchema),
  documentController.rename,
);

router.post(
  "/mkdir",
  StaffOnly,
  validate(ProjectPathSchema),
  documentController.mkdir,
);

router.post(
  "/rmdir",
  StaffOnly,
  validate(ProjectPathSchema),
  documentController.rmdir,
);

router.post(
  "/remove",
  StaffOnly,
  validate(ProjectPathSchema),
  documentController.remove,
);

router.post(
  "/download",
  StaffOnly,
  validate(ProjectPathSchema),
  documentController.download,
);

router.post(
  "/upload",
  StaffOnly,
  multerHandler("file"),
  documentController.upload,
);
router.post(
  "/upload/chunk",
  StaffOnly,
  multerHandler("file"),
  documentController.uploadChunk,
);
export default router;
