import { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../../services/user/DTO";
import { ReactNode } from "react";
import toast from "react-hot-toast";

interface Props {
  requiredRole?: UserDTO.Role[];
  children?: ReactNode;
}

export const PrivateRoute = ({
  requiredRole = [UserDTO.Role.EMPLOYEE],
  children,
}: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
      toast.error("Você precisa estar logado para acessar esta página.");
      return;
    }

    if (requiredRole && !requiredRole.includes(user.role)) {
      navigate("/access-denied", { replace: true });
      toast.error("Você não tem permissão para acessar esta página.");
      return;
    }
  }, [user, requiredRole, navigate]);

  if (!user || (requiredRole && !requiredRole.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
};
