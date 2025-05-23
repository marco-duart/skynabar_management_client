import { useProducts } from "../../hooks/use-products";
import { ProductsTable } from "../../components/tables/products-table";
import * as S from "./styles";
import { LoadingSpinner } from "../../components/loading-spinner";
import { EmptyState } from "../../components/ui/empty-state";
import { Box } from '@styled-icons/fa-solid';
import { theme } from "../../assets/styles/theme";

export const HomePage = () => {
  const { isLoading, hasProducts } = useProducts();

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Gestão de Estoque</S.Title>
      </S.Header>

      <S.Content>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {hasProducts ? (
              <ProductsTable />
            ) : (
              <EmptyState
                icon={<Box size={48} color={theme.colors.text.secondary} />}
                title="Nenhum produto cadastrado"
                description="Comece adicionando seu primeiro produto ao estoque"
              />
            )}
          </>
        )}
      </S.Content>
    </S.PageContainer>
  );
};