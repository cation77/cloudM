import type { Request, Response } from "express";
import { sendSuccess } from "@/utils/response";
import * as userService from "@/services/user";

export const list = async (req: Request, res: Response) => {
  const users = await userService.list();
  sendSuccess(res, users);
};

export const register = async (req: Request, res: Response) => {
  const user = await userService.register(req.body);
  sendSuccess(res, user);
};
