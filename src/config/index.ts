// src/config/index.ts
import dotenv from "dotenv";
import { z } from "zod";

// 1. 加载 .env 文件到 process.env
dotenv.config();

// 2. 定义环境变量的 Schema
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10, "JWT_SECRET 必须至少10位"),
  PORT: z.string().default("3000").transform(Number),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// 3. 校验并导出
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error("❌ 环境变量配置错误:", envParse.error.format());
  process.exit(1); // 配置错误直接关停服务
}

export const config = envParse.data;
