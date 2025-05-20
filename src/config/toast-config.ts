import { theme } from "../assets/styles/theme";

export const toastConfig = {
  position: "top-center" as const,
  className: "skynabar-toast",
  duration: 4000,
  style: {
    border: `1px solid ${theme.colors.primary.dark}`,
    padding: theme.spacing(3),
    background: theme.colors.background.paper,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.sm,
    borderRadius: theme.shape.borderRadius.md,
    boxShadow: theme.shadows.md,
  },
  iconTheme: {
    primary: theme.colors.primary.main,
    secondary: theme.colors.background.paper,
  },
};
