import { UserRole } from "../providers/AuthProvider";

export interface IUser {
    _id: string;
    SK: string;
    name: string;
    role: UserRole;
    email: string;
    passwordHash: string;
  }