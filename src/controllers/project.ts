import type { Request, Response } from "express";
import { sendSuccess } from "@/utils/response";
import * as projectService from "@/services/project";

export const getProjects = async (req: Request, res: Response) => {
  const projects = await projectService.getAllProjects();
  sendSuccess(res, projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const project = await projectService.getProjectById(req.params.id as string);
  sendSuccess(res, project);
};

export const createProject = async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body);
  sendSuccess(res, project);
};