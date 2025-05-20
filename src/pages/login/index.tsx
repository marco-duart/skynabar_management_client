import { LoginForm } from "../../components/forms/login-form";
import * as S from "./styles";

export const LoginPage = () => {
  return (
    <S.LoginContainer>
      <S.Title>Bem-vindo ao Gestão Skynabar</S.Title>
      <LoginForm />
    </S.LoginContainer>
  );
};
