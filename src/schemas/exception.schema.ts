import { z } from "zod";
import { PAGINATION_DEFAULT_PAGE_SIZE } from "@/config";

export const ErrorReportSchema = z.object({
  type: z.enum(["JS_ERROR", "PROMISE_ERROR", "RESOURCE_ERROR", "API_ERROR"]),
  url: z.string(),
  message: z.string().min(1),
  stack: z.string().default(""),
  meta: z.record(z.string(), z.any()).default({}),
  userAgent: z.string().default(""),
  // clientIp: z.string().default(''),
});

export const QuerySchema = z.object({
  query: z.object({
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
    type: z
      .enum(["JS_ERROR", "PROMISE_ERROR", "RESOURCE_ERROR", "API_ERROR"])
      .optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  }),
});

export type ErrorReportInput = z.infer<typeof ErrorReportSchema>;
export type QueryInput = z.infer<typeof QuerySchema>["query"];
