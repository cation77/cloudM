import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(2, "账号至少需要2个字符"),
    password: z.string().min(6, "密码至少需要6个字符"),
  }),
});

// 自动推断类型供 Service 或 Controller 使用
export type LoginInput = z.infer<typeof loginSchema>["body"];
