import { Button, ButtonProps } from "react-bootstrap";
import { FC } from "react";

interface IProps extends ButtonProps {
  isLoading?: boolean
}

export const LoadingButton:FC<IProps> = ({isLoading, children, disabled, ...buttonProps}) => {
  return <Button {...buttonProps} disabled={isLoading || disabled}>
    {isLoading ? 'Завантаження...' : children}
  </Button>
}