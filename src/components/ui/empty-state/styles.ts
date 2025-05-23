import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)};
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const IconContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  max-width: 400px;
`;