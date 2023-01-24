import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode
}

export const ErrorLabel: FC<Props> = ({ children }) => {
  return <span style={{ color: 'red' }}>{children}</span>
}