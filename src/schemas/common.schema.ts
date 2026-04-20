import { z } from "zod";
import { PAGINATION_DEFAULT_PAGE_SIZE } from "@/config";

// 定义查询ID校验规则
export const QueryIdSchema = z.object({
  query: z.object({
    id: z.string(),
  }),
});

export const PaginationBase = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => Math.max(1, Number(val) || 1)),
  pageSize: z
    .string()
    .optional()
    .transform((val) =>
      Math.max(1, Number(val) || PAGINATION_DEFAULT_PAGE_SIZE),
    ),
});

export const DateRangeBase = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const PaginationSchema = z.object({
  query: PaginationBase,
});

export type PaginationInput = z.infer<typeof PaginationSchema>["query"];
