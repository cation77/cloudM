import type { Request, Response, NextFunction } from "express";
import type { Role } from "@/types/auth";

const authorize = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 假设之前的 auth 中间件已经把用户信息存到了 req.user
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "未授权，请先登录" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "权限不足，无法访问该资源" });
    }

    next();
  };
};

export default authorize;
