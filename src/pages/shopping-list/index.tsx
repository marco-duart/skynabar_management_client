import { useProducts } from "../../hooks/use-products";
import * as S from "./styles";
import { LoadingSpinner } from "../../components/loading-spinner";
import { Button } from "../../components/ui/button";
import { Print } from "@styled-icons/material";
import { useTheme } from "styled-components";

export const ShoppingListPage = () => {
  const theme = useTheme();
  const { shoppingList, isLoading } = useProducts();

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <S.PageContainer>
      <S.PrintStyles />
      <S.Header>
        <S.Title>Lista de Compras</S.Title>
        {shoppingList.length > 0 && (
          <Button
            variant="primary"
            icon={<Print size={18} color={theme.colors.common.white} />}
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        )}
      </S.Header>

      {shoppingList.length > 0 ? (
        <S.ListContainer>
          <S.ListHeader>
            <S.HeaderItem>Produto</S.HeaderItem>
            <S.HeaderItem>Quantidade</S.HeaderItem>
            <S.HeaderItem>Medida</S.HeaderItem>
          </S.ListHeader>

          {shoppingList.map((item) => (
            <S.ListItem key={item.id}>
              <S.ProductName>{item.name}</S.ProductName>
              <S.Quantity>{item.to_buy}</S.Quantity>
              <S.Unit>{item.translated_unit}</S.Unit>
            </S.ListItem>
          ))}
        </S.ListContainer>
      ) : (
        <S.EmptyState>
          <S.EmptyText>Nenhum item para comprar no momento</S.EmptyText>
          <S.EmptySubtext>Seu estoque está em dia!</S.EmptySubtext>
        </S.EmptyState>
      )}
    </S.PageContainer>
  );
};
