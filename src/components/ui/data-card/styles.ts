import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius.md};
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.hint};
  margin: 0;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const CardValue = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
