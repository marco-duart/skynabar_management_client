import { useProducts } from "../../hooks/use-products";
import { ProductsTable } from "../../components/tables/products-table";
import * as S from "./styles";
import { LoadingSpinner } from "../../components/loading-spinner";

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
              <S.EmptyState>
                <S.EmptyStateText>Nenhum produto cadastrado</S.EmptyStateText>
              </S.EmptyState>
            )}
          </>
        )}
      </S.Content>
    </S.PageContainer>
  );
};
