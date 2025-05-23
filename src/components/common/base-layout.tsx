import { Outlet } from "react-router-dom";
import { Header } from "./header";
import * as S from "./styles";

export const BaseLayout = () => {
  return (
    <S.LayoutContainer>
      <Header />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  );
};
