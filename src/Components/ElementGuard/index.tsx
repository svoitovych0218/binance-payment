import { useHasPermission } from "hooks/useHasPermission";
import { UserRole } from "providers/AuthProvider";
import { FC } from "react";

interface IProps{
  roles: Array<UserRole>
  children: React.ReactNode
}

export const ElementGuard: FC<IProps> = ({ roles, children }) => {
  const hasPermission = useHasPermission(roles);
  return (
    <>
      {hasPermission ? children : null}
    </>
  )
}