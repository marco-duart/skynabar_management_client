import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "../components/private-route";
import { UserDTO } from "../services/user/DTO";
import { useAuth } from "../contexts/auth-context";
import { BaseLayout } from "../components/common/base-layout";
import { LoginPage } from "../pages/login";
import { HomePage } from "../pages/home";
import { LoadingSpinner } from "../components/loading-spinner";

export default function Router() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute
              requiredRole={[UserDTO.Role.EMPLOYEE, UserDTO.Role.MANAGER]}
            >
              <BaseLayout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
