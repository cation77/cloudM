import { z } from "zod";

export const PathSchema = z.object({
  query: z.object({
    path: z.string(),
  }),
});

export const ProjectPathSchema = z.object({
  body: z.object({
    projectId: z.string(),
    path: z.string(),
  }),
});

export const RenameSchema = z.object({
  body: z.object({
    projectId: z.string(),
    oldPath: z.string(),
    newPath: z.string(),
  }),
});

export const UploadSchema = z.object({
  body: z.object({
    projectId: z.string(),
    path: z.string(),
    file: z.file(),
  }),
});

export type UploadInput = z.infer<typeof UploadSchema>["body"];
export type RenameInput = z.infer<typeof RenameSchema>["body"];
export type ProjectPathInput = z.infer<typeof ProjectPathSchema>["body"];
