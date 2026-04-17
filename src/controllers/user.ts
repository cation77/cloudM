import type { Request, Response } from "express";
import { sendSuccess, sendError } from "@/utils/response";
import * as userService from "@/services/user";

export const list = async (req: Request, res: Response) => {
  const users = await userService.list();
  sendSuccess(res, users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  sendSuccess(res, user);
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.body.id;
  const currentUser = req.user;
  if (currentUser.role !== "ADMIN" && currentUser.id !== userId) {
    sendError(res, "您没有权限更新该用户", 403);
    return;
  }
  const user = await userService.updateUser(req.body);
  sendSuccess(res, user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.body.id;
  await userService.deleteUser(userId);
  sendSuccess(res, "删除成功");
};

export const userInfo = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await userService.userInfo(userId);
  sendSuccess(res, user);
};

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.user.id;
  await userService.updatePassword(userId, req.body);
  sendSuccess(res, "密码修改成功");
};
