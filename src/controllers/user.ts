import type { Request, Response } from "express";
import AppError from "@/utils/appError";
import { sendSuccess } from "@/utils/response";
import * as userService from "@/services/user";
import { Role } from "@/types/auth";
import { UserResponseSchema } from "@/schemas/user.schema";
import { PaginationSchema } from "@/schemas/common.schema";

export const list = async (req: Request, res: Response) => {
  const parse = PaginationSchema.parse({ query: req.query });
  const result = await userService.list(parse.query);
  // 格式化列表中的时间戳（利用之前定义的 UserResponseSchema）
  const formattedList = result.list.map((user) =>
    UserResponseSchema.parse(user),
  );
  sendSuccess(res, {
    ...result,
    list: formattedList,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  sendSuccess(res, user);
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.body.id;
  const currentUser = req.user;
  if (currentUser.role !== Role.ADMIN && currentUser.id !== userId) {
    throw new AppError("您没有权限更新该用户", 403);
  }
  const user = await userService.updateUser(req.body);
  sendSuccess(res, user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(req.query.id as string);
  sendSuccess(res, null, "删除成功");
};

export const userInfo = async (req: Request, res: Response) => {
  const userId = req.query.id as string;
  const currentUser = req.user;
  if (currentUser.role !== Role.ADMIN && currentUser.id !== userId) {
    throw new AppError("您没有权限查看该用户信息", 403);
  }
  const user = await userService.userInfo(userId);
  sendSuccess(res, user);
};

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.user.id;
  await userService.updatePassword(userId, req.body);
  sendSuccess(res, null, "密码修改成功");
};
