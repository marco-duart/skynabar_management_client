import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(4)};
  padding-top: 80px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: ${({ theme }) => theme.spacing(6)};
    padding-top: 90px;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: 100;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  max-width: 1440px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  }
`;

export const Logo = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
`;

export const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-150%)')};
  transition: transform 0.3s ease;
  z-index: 99;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    position: static;
    flex-direction: row;
    align-items: center;
    padding: 0;
    box-shadow: none;
    transform: none;
    background: transparent;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  list-style: none;
  margin: 0;
  padding: 0;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing(4)};
  }
`;

export const NavItem = styled.li``;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.2s ease;
  padding: ${({ theme }) => theme.spacing(1)} 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: ${({ theme }) => theme.spacing(2)} 0;
  }
`;

export const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid ${({ theme }) => theme.colors.text.disabled}20;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: row;
    align-items: center;
    padding-top: 0;
    border-top: none;
    margin-left: ${({ theme }) => theme.spacing(4)};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    border-left: 1px solid ${({ theme }) => theme.colors.text.disabled}20;
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    display: none;
  }
`;