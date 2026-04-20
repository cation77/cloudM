import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import AppError from "@/utils/appError";
import { getProjectById } from "./project";
import logger from "@/utils/logger";
import type { UploadInput } from "@/schemas/document.schema";

export const getProjectAbsolutePath = async (
  projectId: string,
  inputPath: string,
) => {
  const project = await getProjectById(projectId);
  const absoluteProjectPath = path.isAbsolute(project.path)
    ? project.path
    : path.resolve(process.cwd(), project.path);
  try {
    // 1. 核心优化：一次 stat 调用获取所有状态
    const stats = await fs.stat(absoluteProjectPath);
    // 2. 确定基准目录
    const baseDir = stats.isDirectory()
      ? absoluteProjectPath
      : path.dirname(absoluteProjectPath);
    // 3. 计算相对路径
    // 注意：建议对 inputPath 也进行一次 path.resolve，确保计算基准一致
    return path.resolve(baseDir, path.resolve(inputPath));
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new AppError(`Project path not found: ${project.path}`, 404);
    }
    throw error;
  }
};

export const pathInfo = async (projectId: string, filePath: string) => {
  const absolutePath = await getProjectAbsolutePath(projectId, filePath);
  try {
    const stats = await fs.stat(absolutePath);
    return { name: path.basename(absolutePath), path: absolutePath, stats };
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new AppError(`文件不存在: ${filePath}`, 404);
    }
    throw error;
  }
};

export const rename = async (
  projectId: string,
  oldPath: string,
  newPath: string,
) => {
  const absolutePath = await getProjectAbsolutePath(projectId, oldPath);
  try {
    await fs.stat(absolutePath);
    const absoluteNewPath = path.join(path.dirname(absolutePath), newPath);
    await fs.rename(absolutePath, absoluteNewPath);
    return absoluteNewPath;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new AppError(`没有找到文件: ${oldPath}`, 404);
    }
    throw error;
  }
};

export const mkdir = async (projectId: string, path: string) => {
  const absolutePath = await getProjectAbsolutePath(projectId, path);
  try {
    await fs.mkdir(absolutePath, { recursive: true });
  } catch (error: any) {
    if (error.code === "EEXIST") {
      throw new AppError(`目录已存在: ${path}`, 400);
    }
    throw error;
  }
};

export const rmdir = async (projectId: string, path: string) => {
  const absolutePath = await getProjectAbsolutePath(projectId, path);
  try {
    // 1. 检查目录是否存在
    await fs.stat(absolutePath);
    // 判断是否空目录
    const files = await fs.readdir(absolutePath);
    if (files.length > 0) {
      // 递归删除目录
      await fs.rm(absolutePath, { recursive: true, force: true });
    } else {
      await fs.rmdir(absolutePath);
    }
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new AppError(`目录不存在: ${path}`, 404);
    }
    throw error;
  }
};

export const remove = async (projectId: string, path: string) => {
  const absolutePath = await getProjectAbsolutePath(projectId, path);
  try {
    await fs.rm(absolutePath);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new AppError(`文件不存在: ${path}`, 404);
    }
    throw error;
  }
};

export const download = async (projectId: string, path: string) => {
  const absolutePath = await getProjectAbsolutePath(projectId, path);
  try {
    const stats = await fs.stat(absolutePath);
    const fileStream = createReadStream(absolutePath);
    return { stream: fileStream, size: stats.size };
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new AppError(`文件不存在: ${path}`, 404);
    }
    throw error;
  }
};

export const upload = async (
  projectId: string,
  filePath: string,
  file: any,
) => {
  logger.info(`Upload file to ${projectId} ${filePath}`);
  // const relativePath = await getProjectAbsolutePath(projectId, filePath);
  // return relativePath;
};

export const uploadChunk = async (
  projectId: string,
  filePath: string,
  chunkIndex: number,
  totalChunks: number,
  fileStream: any,
) => {
  logger.info(
    `Upload chunk ${chunkIndex} of ${totalChunks} to ${projectId} ${filePath}`,
  );
};

export const list = async (inputPath: string) => {
  try {
    const stats = await fs.stat(inputPath);
    const dir = stats.isDirectory() ? inputPath : path.dirname(inputPath);
    const files = await fs.readdir(dir);
    const fileList = [];
    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const fileStats = await fs.stat(filePath);
        fileList.push({
          name: file,
          time: fileStats.mtime.getTime(),
          type: fileStats.isDirectory() ? "d" : "f",
          size: fileStats.size,
        });
      } catch (error: any) {
        // 忽略锁定或无权限的文件，继续处理下一个
        if (["EBUSY", "EPERM", "EACCES"].includes(error.code)) {
          console.warn(`跳过受限文件: ${file}`);
          continue;
        }
        throw error;
      }
    }
    return fileList;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new AppError(`Path not found: ${inputPath}`, 404);
    }
    throw error;
  }
};
