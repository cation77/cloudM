import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ZodObject } from "zod";

export const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // parse 会检查 req 中的数据，多出的参数会被剔除，缺失的必填项会抛错
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // 格式化 Zod 的错误信息，使其更易读
        const errorMessages = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        return next({
          statusCode: 400,
          message: `参数校验失败: ${errorMessages}`,
          isOperational: true // 标记为业务级错误
        });
      }
      next(error);
    }
  };
