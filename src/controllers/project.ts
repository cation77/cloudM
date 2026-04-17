import type { Request, Response } from "express";
import { sendSuccess } from "@/utils/response";
import * as projectService from "@/services/project";
import { PaginationSchema } from "@/schemas/common.schema";

export const list = async (req: Request, res: Response) => {
  const parse = PaginationSchema.parse({ query: req.query });
  const result = await projectService.list(parse.query);
  sendSuccess(res, result);
};

export const createProject = async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body);
  sendSuccess(res, project);
};

export const updateProject = async (req: Request, res: Response) => {
  const project = await projectService.updateProject(req.body);
  sendSuccess(res, project);
};

export const getProject = async (req: Request, res: Response) => {
  const project = await projectService.getProjectById(req.query.id as string);
  sendSuccess(res, project);
};

export const deleteProject = async (req: Request, res: Response) => {
  await projectService.deleteProject(req.query.id as string);
  sendSuccess(res, null, "删除成功");
};
