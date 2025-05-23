import * as S from "./styles";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.ButtonVariant;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
}

export const Button = ({
  variant = "primary",
  children,
  isLoading = false,
  icon,
  iconPosition = 'left',
  size = 'medium',
  ...props
}: Props) => {
  return (
    <S.ButtonContainer 
      variant={variant} 
      isLoading={isLoading}
      hasIcon={!!icon}
      iconPosition={iconPosition}
      size={size}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <S.IconWrapper position="left">
          {icon}
        </S.IconWrapper>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <S.IconWrapper position="right">
          {icon}
        </S.IconWrapper>
      )}
    </S.ButtonContainer>
  );
};