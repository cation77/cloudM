// middlewares/busboy.handler.ts
import Busboy from "busboy";
import type { Request } from "express";
import AppError from "@/utils/appError";
import { Readable } from "node:stream";

interface BusboyResult {
  fields: Record<string, any>;
  fileStream: Readable;
  filename: string;
  encoding: string;
  mimetype: string;
}

export const parseBusboy = (req: Request): Promise<BusboyResult> => {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: req.headers,
      limits: { files: 1 }, // 分片上传每次只处理一个流
    });

    const result: Partial<BusboyResult> = { fields: {} };
    let isFileProcessed = false;

    // 解析文本字段 (projectId, chunkIndex 等)
    busboy.on("field", (name: string, val: string) => {
      result.fields![name] = val;
    });

    // 解析文件流
    busboy.on("file", (name: string, file: Readable, info: any) => {
      const { filename, encoding, mimeType } = info;
      isFileProcessed = true;

      // 注意：这里不写磁盘，而是将流和字段直接返回给 Controller
      resolve({
        fields: result.fields as Record<string, string>,
        fileStream: file,
        filename,
        encoding,
        mimetype: mimeType,
      });
    });

    busboy.on("finish", () => {
      if (!isFileProcessed) {
        reject(new AppError("未检测到文件流", 400));
      }
    });

    busboy.on("error", (err: any) =>
      reject(new AppError(`解析失败: ${err.message}`, 500)),
    );

    req.pipe(busboy);
  });
};
