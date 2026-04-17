import bcrypt from "bcryptjs";
import prisma from "@/client";
import AppError from "@/utils/appError";
import type {
  CreateUserInput,
  UpdateUserInput,
  ChangePasswordInput,
} from "@/schemas/user.schema";

export const list = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      nick: true,
      role: true,
    },
  });
};

export const createUser = async (data: CreateUserInput) => {
  const existing = await prisma.user.findUnique({
    where: { username: data.username },
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

export const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const userInfo = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      nick: true,
      role: true,
    },
  });
};

export const updatePassword = async (
  userId: string,
  data: ChangePasswordInput,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new AppError("用户不存在", 400);
  }
  const isMatch = await bcrypt.compare(data.oldPassword, user.password);
  if (!isMatch) {
    throw new AppError("旧密码错误", 400);
  }
  const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
  return await prisma.user.update({
    where: { id: userId },
    data: {
      password: newPasswordHash,
    },
  });
};
