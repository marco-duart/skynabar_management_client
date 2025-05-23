import styled, { css } from "styled-components";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "icon"
  | "text";

export const ButtonContainer = styled.button<{
  variant: ButtonVariant;
  isLoading?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.shape.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
        return css`
          background-color: ${theme.colors.primary.main};
          color: ${theme.colors.common.white};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary.dark};
          }

          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.primary.light};
          }
        `;
      case "secondary":
        return css`
          background-color: ${theme.colors.secondary.main};
          color: ${theme.colors.common.white};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary.dark};
          }

          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.secondary.light};
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary.main};
          border: 1px solid ${theme.colors.primary.main};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary.light}20;
          }

          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.primary.light};
          }
        `;
      case "icon":
        return css`
          background-color: transparent;
          color: ${theme.colors.text.primary};
          padding: ${theme.spacing(1.5)};
          border-radius: 50%;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.light};
          }

          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.primary.light};
          }
        `;
      case "text":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary.main};
          padding: 0;

          &:hover:not(:disabled) {
            text-decoration: underline;
          }

          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.primary.light};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary.main};
          color: ${theme.colors.common.white};
        `;
    }
  }}

  ${({ isLoading }) =>
    isLoading &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;
