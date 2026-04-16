export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

// 定义权限等级（数值越大权限越高）
export const RoleLevel: Record<Role, number> = {
  [Role.GUEST]: 1,
  [Role.USER]: 2,
  [Role.ADMIN]: 3
};