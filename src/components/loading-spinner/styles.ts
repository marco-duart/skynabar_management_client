import styled, { keyframes } from "styled-components";
import { Spinner } from "@styled-icons/fa-solid/Spinner";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div<{ $size?: 'small' | 'medium' }>`
  display: flex;
  flex-direction: ${({ $size }) => $size === 'small' ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
  gap: ${({ theme, $size }) => $size === 'small' ? theme.spacing(1) : theme.spacing(2)};
  padding: ${({ $size }) => $size === 'small' ? '0' : ({ theme }) => theme.spacing(2)};
  height: ${({ $size }) => $size === 'small' ? 'auto' : '100vh'};
`;

export const SpinnerIcon = styled(Spinner)<{ $size?: 'small' | 'medium' }>`
  width: ${({ theme, $size }) => 
    $size === 'small' ? theme.spacing(3) : theme.spacing(6)};
  height: ${({ theme, $size }) => 
    $size === 'small' ? theme.spacing(3) : theme.spacing(6)};
  color: ${({ theme }) => theme.colors.primary.main};
  animation: ${spin} 1s linear infinite;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: ${({ theme, $size }) => 
      $size === 'small' ? theme.spacing(4) : theme.spacing(8)};
    height: ${({ theme, $size }) => 
      $size === 'small' ? theme.spacing(4) : theme.spacing(8)};
  }
`;

export const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;