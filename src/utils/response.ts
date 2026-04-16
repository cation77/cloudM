import type { Response } from "express";
import type { ApiResponse } from "@/types/response";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  code = 200,
) => {
  const response: ApiResponse<T> = {
    code,
    success: true,
    message,
    data,
  };
  return res.status(code).json(response);
};

export const sendError = (
  res: Response,
  message = "Internal Server Error",
  code = 500,
) => {
  const response: ApiResponse = {
    code,
    success: false,
    message,
    data: null,
  };
  return res.status(code).json(response);
};
