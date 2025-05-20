import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 100%;
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: 1.5;
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.default};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing(2)};
    color: ${theme.colors.common.black};
  }

  h1 {
    font-size: ${theme.typography.fontSize["3xl"]};
  }

  h2 {
    font-size: ${theme.typography.fontSize.xxl};
  }

  h3 {
    font-size: ${theme.typography.fontSize.xl};
  }

  p {
    margin-bottom: ${theme.spacing(2)};
    color: ${theme.colors.text.secondary};
  }

  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.primary.dark};
    }
  }

  ul, ol {
    list-style: none;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.main};
    border-radius: ${theme.shape.borderRadius.lg};

    &:hover {
      background: ${theme.colors.primary.dark};
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @media ${theme.mediaQuery.mobileS} {
    html {
      font-size: 90%;
    }
  }

  @media ${theme.mediaQuery.tablet} {
    html {
      font-size: 95%;
    }
  }

  @media ${theme.mediaQuery.desktop} {
    html {
      font-size: 100%;
    }
  }

  .text-success {
    color: ${theme.colors.status.success};
  }

  .text-warning {
    color: ${theme.colors.status.warning};
  }

  .text-error {
    color: ${theme.colors.status.error};
  }

  .text-info {
    color: ${theme.colors.status.info};
  }

  .bg-primary {
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.common.white};
  }

  .bg-secondary {
    background-color: ${theme.colors.secondary.main};
    color: ${theme.colors.common.white};
  }

  .p-1 { padding: ${theme.spacing(1)}; }
  .p-2 { padding: ${theme.spacing(2)}; }
  .p-3 { padding: ${theme.spacing(3)}; }
  .p-4 { padding: ${theme.spacing(4)}; }

  .m-1 { margin: ${theme.spacing(1)}; }
  .m-2 { margin: ${theme.spacing(2)}; }
  .m-3 { margin: ${theme.spacing(3)}; }
  .m-4 { margin: ${theme.spacing(4)}; }
`;
