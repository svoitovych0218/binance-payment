import { Button, ButtonProps } from "react-bootstrap";
import { FC } from "react";

interface IProps extends ButtonProps {
  isLoading?: boolean
}

export const LoadingButton:FC<IProps> = ({isLoading, children, ...buttonProps}) => {
  return <Button {...buttonProps}>
    {isLoading ? 'Завантаження...' : children}
  </Button>
}