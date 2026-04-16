import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import { Role } from "@/types/auth";

export const AdminOnly = [authenticate, authorize([Role.ADMIN])];
export const StaffOnly = [authenticate, authorize([Role.ADMIN, Role.USER])];