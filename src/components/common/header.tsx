import { useState } from "react";
import { useTheme } from "styled-components";
import { X, User } from "@styled-icons/fa-solid";
import { Menu } from "@styled-icons/material";
import { useAuth } from "../../contexts/auth-context";
import * as S from "./styles";

export const Header = () => {
  const theme = useTheme();
  const { user, logout, isManager } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userIsManager = isManager();

  return (
    <S.Header>
      <S.HeaderContainer>
        <S.Logo href="/home">Skynabar Stock</S.Logo>

        <S.Nav $isOpen={mobileMenuOpen}>
          <S.NavList>
            <S.NavItem>
              <S.NavLink href="/home">Produtos</S.NavLink>
            </S.NavItem>
            {userIsManager && (
              <S.NavItem>
                <S.NavLink href="/shopping-list">Lista de Compras</S.NavLink>
              </S.NavItem>
            )}
            {userIsManager && (
              <S.NavItem>
                <S.NavLink href="/stock-reports">Movimentações</S.NavLink>
              </S.NavItem>
            )}
          </S.NavList>

          <S.UserMenu>
            <S.UserInfo>
              <User size={20} color={theme.colors.primary.main} />
              <span>{user?.name}</span>
            </S.UserInfo>
            <S.LogoutButton onClick={logout}>Sair</S.LogoutButton>
          </S.UserMenu>
        </S.Nav>

        <S.MobileMenuButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X size={24} color={theme.colors.primary.main} />
          ) : (
            <Menu size={24} color={theme.colors.primary.main} />
          )}
        </S.MobileMenuButton>
      </S.HeaderContainer>
    </S.Header>
  );
};
