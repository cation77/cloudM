import bcrypt from "bcryptjs";
import prisma from "@/client";
import AppError from "@/utils/appError";
import type {
  CreateUserInput,
  UpdateUserInput,
  ChangePasswordInput,
} from "@/schemas/user.schema";
import { parsePagination } from "@/utils/pagination";
import type { PaginationInput } from "@/schemas/common.schema";

export const list = async (pagination: PaginationInput) => {
  // 这里的 skip 计算是核心
  const { skip, take } = parsePagination(pagination);
  // 并行执行：查询数据和查询总数
  const [total, list] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      skip,
      take,
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" }, // 通常按时间倒序
      select: {
        // 排除敏感字段
        id: true,
        username: true,
        nick: true,
        role: true,
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

export const userInfo = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id, deletedAt: null },
    select: {
      id: true,
      username: true,
      nick: true,
      role: true,
    },
  });
  if (!user) {
    throw new AppError("用户不存在", 400);
  }
  return user;
};

export const createUser = async (data: CreateUserInput) => {
  const existing = await prisma.user.findUnique({
    where: { username: data.username, deletedAt: null },
  });
  if (existing) {
    throw new AppError("用户名已存在", 400);
  }
  return await prisma.user.create({
    data: {
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
      nick: data.nick,
      role: data.role,
    },
    select: {
      id: true,
      username: true,
      nick: true,
      role: true,
    },
  });
};

export const updateUser = async (data: UpdateUserInput) => {
  await userInfo(data.id);
  return await prisma.user.update({
    where: { id: data.id },
    data: {
      username: data.username,
      nick: data.nick,
      role: data.role,
    },
    select: {
      id: true,
      username: true,
      nick: true,
      role: true,
    },
  });
};

export const deleteUser = async (id: string) => {
  // 先查找
  await userInfo(id);
  // 执行逻辑软删除
  return await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const updatePassword = async (id: string, data: ChangePasswordInput) => {
  const user = await prisma.user.findUnique({ where: { id, deletedAt: null } });
  if (!user) {
    throw new AppError("用户不存在", 400);
  }
  const isMatch = await bcrypt.compare(data.oldPassword, user.password);
  if (!isMatch) {
    throw new AppError("旧密码错误", 400);
  }
  const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
  return await prisma.user.update({
    where: { id },
    data: {
      password: newPasswordHash,
    },
  });
};
