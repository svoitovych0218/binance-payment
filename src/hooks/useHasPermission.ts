import { useAuth } from "./useAuth";
import { UserRole } from "providers/AuthProvider";

export const useHasPermission = (roles: UserRole[]): boolean => {
  const auth = useAuth();
  const user = auth?.user;
  if (!user)
    return false;
  return roles.some(r => r === user.role)
}