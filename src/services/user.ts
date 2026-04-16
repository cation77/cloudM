import prisma from "@/client";
import AppError from "@/utils/appError";
import type { CreateUserInput } from "@/schemas/user.schema";

export const list = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
    },
  });
};

export const register = async (data: CreateUserInput) => {
  const existing = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (existing) {
    throw new AppError("用户名已存在", 400);
  }
  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
      name: data.name,
      role: data.role,
    },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
    },
  });
  return user;
};
