import { z } from "zod";

// 定义创建用户的校验规则
export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(2, "账号至少需要2个字符"),
    password: z.string().min(6, "密码至少需要6个字符"),
    name: z.string().min(2, "姓名至少需要2个字符"),
    role: z.enum(["USER", "GUEST"]).default("USER"),
  }),
});

// 自动推断类型供 Service 或 Controller 使用
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
