import { Role } from "./auth";

// 必须确保这个文件是一个模块，所以需要 export {}
export {};

declare global {
  namespace Express {
    // 扩展 Express 的 Request 接口
    interface Request {
      user: {
        id: string;
        role: Role;
      };
    }
  }
}
