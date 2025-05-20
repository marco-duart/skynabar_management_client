import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "../components/private-route";
import { UserDTO } from "../services/user/DTO";
import { useAuth } from "../contexts/auth-context";
import { LoginPage } from "../pages/login";
import { LoadingSpinner } from "../components/loading-spinner";

export default function Router() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
