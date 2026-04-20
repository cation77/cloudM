// middlewares/multer.handler.ts
import multer from "multer";
import type { Request, Response, NextFunction } from "express";
import AppError from "@/utils/appError";

// 1. 配置存储与限制
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制 5MB
  },
  fileFilter: (req: Request, file: any, cb: any) => {
    // 可选：限制文件类型
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "text/plain",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError(`不支持的文件类型: ${file.mimetype}`, 400));
    }
  },
});

// 2. 导出中间件
export const multerHandler = (fieldName: string) => {
  const uploadAction = upload.single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    uploadAction(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          throw new AppError("文件过大", 413);
        }
        throw new AppError(err.message, 400);
      } else if (err) {
        throw err;
      }
      next();
    });
  };
};
