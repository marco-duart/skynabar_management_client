export const theme = {
  colors: {
    primary: {
      main: "#FF6606",
      light: "#FF8C42",
      dark: "#CC5200",
    },
    secondary: {
      main: "#FF9E16",
      light: "#FFB74D",
      dark: "#FF8A00",
    },
    background: {
      default: "#FFF8F2",
      paper: "#FFFFFF",
      light: "#FFF0E6",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
      disabled: "#9CA3AF",
      hint: "#6B7280",
    },
    common: {
      white: "#FFFFFF",
      black: "#1F2937",
    },
    status: {
      success: "#22C55E",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
      "3xl": "1.875rem",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  shape: {
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
    },
  },
  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },
  mediaQuery: {
    mobileS: `(min-width: 320px)`,
    mobileM: `(min-width: 375px)`,
    mobileL: `(min-width: 425px)`,
    tablet: `(min-width: 768px)`,
    desktop: `(min-width: 1024px)`,
    fullHd: `(min-width: 1920px)`,
  },
};
