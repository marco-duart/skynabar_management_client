import { useForm } from "react-hook-form";
import { LoginFormData, loginResolver } from "../../schemas/login-schema";
import * as S from "./styles";
import { useAuth } from "../../contexts/auth-context";
import { LoadingSpinner } from "../loading-spinner";

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: loginResolver,
  });

  const handleLogin = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(handleLogin)}>
      <S.LogoContainer>
        <S.LogoImage src="/logo.png" alt="Logo da organização" />
      </S.LogoContainer>

      <S.InputContainer>
        <S.Label htmlFor="email">E-mail</S.Label>
        <S.Input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && (
          <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
        )}
      </S.InputContainer>

      <S.InputContainer>
        <S.Label htmlFor="password">Senha</S.Label>
        <S.Input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
          disabled={isLoading}
        />
        {errors.password && (
          <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
        )}
      </S.InputContainer>

      <S.SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : "Entrar"}
      </S.SubmitButton>
    </S.FormContainer>
  );
};
