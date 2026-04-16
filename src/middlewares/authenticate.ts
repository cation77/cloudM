import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/auth";
import { sendError } from "@/utils/response";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    sendError(res, "未登录或 Token 缺失", 401);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token!);
    // 将解析出的 user 信息存入 req，方便后续权限中间件使用
    (req as any).user = decoded;
    next();
  } catch (error) {
    sendError(res, "Token 无效或已过期", 401);
  }
};

export default authenticate;
