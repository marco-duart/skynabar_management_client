import { GlobalStyles } from "./assets/styles/global-styles";
import { ThemeProvider } from "styled-components";
import Router from "./routes";
import { AuthProvider } from "./contexts/auth-context";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "./config/toast-config";
import { theme } from "./assets/styles/theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Toaster toastOptions={{ ...toastConfig }} />
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
