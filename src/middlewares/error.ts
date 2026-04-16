// src/middlewares/error.handler.ts
import type { Request, Response, NextFunction } from "express";
import logger from "@/utils/logger";
import AppError from "@/utils/appError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const code = err.statusCode || 500;
  err.status = err.status || "error";

  if (err instanceof AppError && err.isOperational) {
    // 1. 业务型错误（预期内）：记录为 warn 或 info，不需要记录堆栈，避免干扰
    logger.warn(`Business Error: ${err.message}`, {
      path: req.originalUrl,
      statusCode: code,
    });
  } else {
    // 2. 编程/系统错误（预期外）：记录为 error，必须包含 stack 堆栈
    logger.error(`System Crash: ${err.message}`, {
      stack: err.stack,
      path: req.originalUrl,
      body: req.body,
    });
  }

  res.status(code).json({
    code,
    success: false,
    message: err.message || "Internal Server Error",
    data: null, // 错误时 data 为空
  });
};
