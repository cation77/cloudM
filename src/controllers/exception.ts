import type { Request, Response } from "express";
import { sendSuccess } from "@/utils/response";
import * as exceptionService from "@/services/exception";
import { ErrorReportSchema, QuerySchema } from "@/schemas/exception.schema";

export const report = async (req: Request, res: Response) => {
  const validatedData = ErrorReportSchema.parse(req.body);
  const ip = req.ip || "";
  await exceptionService.reportError(validatedData, ip);
  // 成功返回204，上报接口通常无需返回大量内容，仅返回状态码即可
  res.status(204).send();
};

export const list = async (req: Request, res: Response) => {
  const validatedData = QuerySchema.parse({ query: req.query });
  const result = await exceptionService.list(validatedData.query);
  sendSuccess(res, result);
};
