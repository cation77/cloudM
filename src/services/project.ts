import prisma from "@/client";
import AppError from "@/utils/appError";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/schemas/project.schema";
import { parsePagination } from "@/utils/pagination";
import type { PaginationInput } from "@/schemas/common.schema";

export const list = async (pagination: PaginationInput) => {
  // 这里的 skip 计算是核心
  const { skip, take } = parsePagination(pagination);
  // 并行执行：查询数据和查询总数
  const [total, list] = await Promise.all([
    prisma.project.count(),
    prisma.project.findMany({
      skip,
      take,
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" }, // 通常按时间倒序
      select: {
        // 排除敏感字段
        id: true,
        name: true,
        path: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
  ]);
  return {
    list,
    pagination: {
      total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: Math.ceil(total / pagination.pageSize),
    },
  };
};

export const getProjectById = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id, deletedAt: null },
  });
  if (!project) {
    throw new AppError("Project not found", 404);
  }
  return project;
};

export const createProject = async (project: CreateProjectInput) => {
  return await prisma.project.create({ data: project });
};

export const updateProject = async (project: UpdateProjectInput) => {
  await getProjectById(project.id);
  return await prisma.project.update({
    where: { id: project.id },
    data: project,
  });
};

export const deleteProject = async (id: string) => {
  await getProjectById(id);
  return await prisma.project.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
