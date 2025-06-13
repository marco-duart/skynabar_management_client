import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const ListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.common.white};
  padding: ${({ theme }) => theme.spacing(3)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const HeaderItem = styled.div`
  text-align: center;

  &:first-child {
    text-align: left;
  }
`;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.light};

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

export const ProductName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const Quantity = styled.div`
  text-align: center;
`;

export const Unit = styled.div`
  text-align: center;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(6)};
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const EmptySubtext = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const PrintStyles = styled.div`
  @media print {
    body * {
      visibility: hidden;
    }
    ${PageContainer}, ${PageContainer} * {
      visibility: visible;
    }
    ${PageContainer} {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 0;
    }
    ${ListContainer} {
      box-shadow: none;
      border-radius: 0;
    }
    ${Header} {
      display: none;
    }
  }
`;