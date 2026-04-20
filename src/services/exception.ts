import prisma from "@/client";
import { createHash } from "node:crypto";
import { parsePagination } from "@/utils/pagination";
import type { ErrorReportInput, QueryInput } from "@/schemas/exception.schema";
import type { Prisma } from "@prisma/client";
import logger from "@/utils/logger";

const generateFingerprint = (data: ErrorReportInput) => {
  const rowStr = `${data.type}|${data.message}|${data.url}|${data.stack || ""}`;
  return createHash("md5").update(rowStr).digest("hex");
};

const checkAlarm = async (record: Prisma.ErrorLogCreateInput) => {
  // TODO：Redis 告警阈值的“滑动窗口”优化
  logger.info(`check alarm: ${record.type}`);
};

export const reportError = async (data: ErrorReportInput, ip: string) => {
  // TODO：
  // 1. 域名黑名单检查
  // 2. 堆栈特征过滤，过滤脏错误
  // 3. 流量削峰
  const fingerprint = generateFingerprint(data);
  const record = await prisma.errorLog.upsert({
    where: { fingerprint },
    update: {
      count: { increment: 1 }, // 命中则计数加 1
    },
    create: {
      ...data,
      fingerprint,
      count: 1,
    },
  });
  if (record.count >= 100) {
    await checkAlarm(record as Prisma.ErrorLogCreateInput);
  }
  return record;
};

export const list = async (params: QueryInput) => {
  const { skip, take } = parsePagination({
    page: params.page,
    pageSize: params.pageSize,
  });
  let where: Prisma.ErrorLogWhereInput = {};
  if (params.type) {
    where.type = params.type;
  }
  if (params.startDate && params.endDate) {
    where.createdAt = {
      gte: params.startDate,
      lte: params.endDate,
    };
  }
  const [total, list] = await Promise.all([
    prisma.errorLog.count({
      where,
    }),
    prisma.errorLog.findMany({
      skip,
      take,
      where,
      orderBy: { createdAt: "desc" }, // 通常按时间倒序
    }),
  ]);
  return {
    list,
    pagination: {
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    },
  };
};
