import prisma from "@/client";
import logger from "@/utils/logger";
import AppError from "@/utils/appError";
import type { CreateProjectInput } from '@/schemas/project.schema';

export const getAllProjects = async () => {
  logger.info("getAllProjects");
  return await prisma.project.findMany({ orderBy: { id: "asc" } });
};

export const getProjectById = async (id: string) => {
  logger.info(`getProjectById: ${id}`);
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new AppError("Project not found", 404);
  }
  return project;
};

export const createProject = async (project: CreateProjectInput) => {
  return await prisma.project.create({ data: project });
};