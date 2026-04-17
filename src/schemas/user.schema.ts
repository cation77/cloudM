import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  nick: z.string().default(""),
  role: z.string(),
  createdAt: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().transform((val) => Math.floor(val.getTime())),
  ),
  updatedAt: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().transform((val) => Math.floor(val.getTime())),
  ),
});

// 定义创建用户的校验规则
export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(2, "账号至少需要2个字符"),
    password: z.string().min(6, "密码至少需要6个字符"),
    role: z.enum(["USER", "GUEST"]).default("USER"),
    nick: z.string().default(""),
  }),
});

// 定义更新用户的校验规则
export const updateUserSchema = z.object({
  body: z.object({
    id: z.string(),
    username: z.string().min(2, "账号至少需要2个字符"),
    role: z.enum(["USER", "GUEST"]).default("USER"),
    nick: z.string().default(""),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, "旧密码至少需要6个字符"),
    newPassword: z.string().min(6, "新密码至少需要6个字符"),
  }),
});

// 自动推断类型供 Service 或 Controller 使用
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>["body"];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>["body"];
