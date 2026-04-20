import type { Request, Response } from "express";
import { pipeline } from "node:stream/promises";
import { parseBusboy } from "@/middlewares/busboyHandler";
import * as documentService from "@/services/document";
import { sendSuccess } from "@/utils/response";
import type { RenameInput, ProjectPathInput } from "@/schemas/document.schema";

export const list = async (req: Request, res: Response) => {
  const result = await documentService.list(req.query.path as string);
  sendSuccess(res, result);
};

export const rename = async (req: Request, res: Response) => {
  const { projectId, oldPath, newPath } = req.body as RenameInput;
  await documentService.rename(projectId, oldPath, newPath);
  sendSuccess(res, "重命名成功");
};

export const mkdir = async (req: Request, res: Response) => {
  const { projectId, path } = req.body as ProjectPathInput;
  await documentService.mkdir(projectId, path);
  sendSuccess(res, "创建成功");
};

export const rmdir = async (req: Request, res: Response) => {
  const { projectId, path } = req.body as ProjectPathInput;
  await documentService.rmdir(projectId, path);
  sendSuccess(res, "删除成功");
};

export const remove = async (req: Request, res: Response) => {
  const { projectId, path } = req.body as ProjectPathInput;
  await documentService.remove(projectId, path);
  sendSuccess(res, "删除成功");
};

export const download = async (req: Request, res: Response) => {
  const { projectId, path } = req.body as ProjectPathInput;
  const result = await documentService.pathInfo(projectId, path);
  res.download(result.path, result.name);
};

export const upload = async (req: Request, res: Response) => {
  const file = req.file as any;
  const { projectId, path } = req.body as ProjectPathInput;
  const result = await documentService.upload(projectId, path, file);
  sendSuccess(res, result);
};

export const downloadPipeline = async (req: Request, res: Response) => {
  const { projectId, path } = req.body as ProjectPathInput;
  const result = await documentService.download(projectId, path);
  res.set({
    "Content-Type": "application/octet-stream",
    "Content-Length": result.size,
    "Content-Disposition": `attachment; filename="${path}"`,
  });
  await pipeline(result.stream, res);
};

export const uploadChunk = async (req: Request, res: Response) => {
  const { fields, fileStream } = await parseBusboy(req);
  const { projectId, path, chunkIndex, totalChunks } = fields;
  const result = await documentService.uploadChunk(
    projectId!,
    path!,
    chunkIndex!,
    totalChunks!,
    fileStream,
  );
  sendSuccess(res, result);
};
