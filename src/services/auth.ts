import prisma from "@/client";
import bcrypt from "bcryptjs";
import AppError from "@/utils/appError";
import { generateToken } from "@/utils/auth";
import type { CreateUserInput } from "@/schemas/user.schema";

export const login = async (data: CreateUserInput) => {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });
  if (!user) {
    throw new AppError("用户不存在", 404);
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new AppError("密码错误", 401);
  }
  const token = generateToken({ userId: user.id, role: user.role });
  return token;
};
