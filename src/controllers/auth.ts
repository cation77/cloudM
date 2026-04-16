import type { Request, Response } from "express";
import { sendSuccess } from "@/utils/response";
import * as userService from "@/services/auth";

export const login = async (req: Request, res: Response) => {
  const user = await userService.login(req.body);
  sendSuccess(res, user);
};

export const logout = async (req: Request, res: Response) => {
  // throw new AppError("未实现", 404);
  sendSuccess(res, {});
};
