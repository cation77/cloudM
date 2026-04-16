// src/middlewares/morgan.middleware.ts
import morgan, { type StreamOptions } from "morgan";
import logger from "@/utils/logger";

// 指定 Morgan 将日志流向 Winston
const stream: StreamOptions = {
  write: (message) => logger.info(message.trim(), { tags: ["http"] }),
};

// 自定义跳过规则：比如在开发环境不记录某些心跳检测接口
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  // 也可以使用自定义格式，记录更多信息：':method :url :status :res[content-length] - :response-time ms'
  "dev",
  { stream },
);

export default morganMiddleware;
