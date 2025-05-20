import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";
import { LoginDTO } from "../services/auth/DTO";
import { UserDTO } from "../services/user/DTO";
import { LoginService } from "../services/auth";

interface AuthContextType {
  user: UserDTO.Model | null;
  token: string | null;
  isLoading: boolean;
  login: (params: LoginDTO.Params) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDTO.Model | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (params: LoginDTO.Params): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await LoginService(params);

      if (!result.success || !result.data || !result.token) {
        toast.error(result.message);
        return false;
      }

      updateUser(result.data, result.token);
      toast.success(result.message);
      return true;
    } catch (error) {
      toast.error("Erro desconhecido ao fazer login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout realizado com sucesso!");
  };

  const updateUser = (updatedUser: UserDTO.Model, token: string) => {
    setUser(updatedUser);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um UserProvider");
  }
  return context;
};
