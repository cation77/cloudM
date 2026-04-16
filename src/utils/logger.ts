// src/utils/logger.ts
import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, printf, colorize } = winston.format;

// 自定义控制台打印格式（开发环境更易读）
const consoleFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (Object.keys(metadata).length > 0) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
  transports: [
    // 1. 错误日志单独文件存储
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // 2. 所有日志定期轮转备份
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // 保留14天
    }),
  ],
});

// 3. 开发环境下，额外打印到控制台
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(colorize(), consoleFormat)
  }));
}

export default logger;