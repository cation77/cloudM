import jwt from "jsonwebtoken";
import { Role } from "@/types/auth";
import { config } from "../config/index";

const EXPIRES_IN = "1d";

export const generateToken = (payload: { id: string; role: Role }) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET) as {
    id: string;
    role: Role;
  };
};
