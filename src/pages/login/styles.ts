import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  text-align: center;

  @media ${({ theme }) => theme.mediaQuery.mobileL} {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  }

  @media ${({ theme }) => theme.mediaQuery.mobileS} {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;