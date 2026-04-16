import { z } from 'zod';

// 定义创建项目的校验规则
export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, "项目名称至少需要2个字符"),
    description: z.string().optional().default(""),
    test: z.string().optional().default(""),
  }),
});

// 自动推断类型供 Service 或 Controller 使用
export type CreateProjectInput = z.infer<typeof createProjectSchema>['body'];
