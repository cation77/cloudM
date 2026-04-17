import {
  PAGINATION_DEFAULT_PAGE_SIZE,
  PAGINATION_MAX_PAGE_SIZE,
} from "@/config";
import type { PaginationInput } from "@/schemas/common.schema";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export function parsePagination(params: PaginationInput) {
  const page = Math.max(1, params.page || 1);
  const pageSize = Math.min(
    PAGINATION_MAX_PAGE_SIZE,
    Math.max(1, params.pageSize || PAGINATION_DEFAULT_PAGE_SIZE),
  );
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}
