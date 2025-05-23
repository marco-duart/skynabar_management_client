import * as S from "./styles";
import { ButtonVariant } from "./styles";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  children,
  isLoading = false,
  ...props
}: Props) => {
  return (
    <S.ButtonContainer variant={variant} isLoading={isLoading} {...props}>
      {children}
    </S.ButtonContainer>
  );
};
