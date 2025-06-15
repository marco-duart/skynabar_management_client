import { useStockReport } from "../../hooks/use-stock-report";
import * as S from "./styles";
import { LoadingSpinner } from "../../components/loading-spinner";
import { Box, ArrowUp, ArrowDown, Refresh } from "@styled-icons/fa-solid";
import { theme } from "../../assets/styles/theme";
import { Button } from "../../components/ui/button";
import { DataCard } from "../../components/ui/data-card";
import { ReportTable } from "../../components/tables/report-table";
import { ProductDTO } from "../../services/products/DTO";

export const StockReportPage = () => {
  const { stockReports, isLoading, fetchStockReports } = useStockReport();

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Relatório de Estoque</S.Title>
        <Button
          onClick={fetchStockReports}
          aria-label="Atualizar relatório"
          variant="secondary"
        >
          <Refresh size={16} />
          Atualizar
        </Button>
      </S.Header>

      <S.Content>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {stockReports ? (
              <>
                <S.IndicatorsGrid>
                  <DataCard
                    title="Entradas"
                    value={stockReports.indicators.movement_stats.inputs}
                    icon={
                      <ArrowUp size={24} color={theme.colors.status.success} />
                    }
                    description="Total de itens adicionados"
                  />
                  <DataCard
                    title="Saídas"
                    value={stockReports.indicators.movement_stats.outputs}
                    icon={
                      <ArrowDown size={24} color={theme.colors.status.error} />
                    }
                    description="Total de itens retirados"
                  />
                  <DataCard
                    title="Ajustes"
                    value={stockReports.indicators.movement_stats.adjustments.toString()}
                    description="Total de ajustes realizados"
                  />
                  <DataCard
                    title="Movimentações"
                    value={stockReports.indicators.movement_stats.total_movements.toString()}
                    description="Total geral"
                  />
                </S.IndicatorsGrid>

                <S.Section>
                  <S.SectionTitle>Produtos com baixo estoque</S.SectionTitle>
                  {stockReports.indicators.low_stock_products.length > 0 ? (
                    <ReportTable
                      columns={[
                        { header: "Produto", accessor: "name" },
                        { header: "SKU", accessor: "sku" },
                        {
                          header: "Estoque Atual",
                          accessor: "current_quantity",
                        },
                        {
                          header: "Unidade",
                          accessor: "unit_type",
                          render: (item) =>
                            ProductDTO.UnitLabels[item.unit_type],
                        },
                        {
                          header: "Data",
                          accessor: "formatted_created_at",
                          mobilePriority: true,
                        },
                      ]}
                      data={stockReports.indicators.low_stock_products}
                    />
                  ) : (
                    <S.EmptyState>
                      <Box size={48} color={theme.colors.text.secondary} />
                      <S.EmptyStateText>
                        Nenhum produto com estoque baixo
                      </S.EmptyStateText>
                    </S.EmptyState>
                  )}
                </S.Section>

                <S.Section>
                  <S.SectionTitle>Últimas movimentações</S.SectionTitle>
                  <ReportTable
                    columns={[
                      { header: "Data", accessor: "formatted_created_at" },
                      { header: "Produto", accessor: "product.name" },
                      { header: "Tipo", accessor: "movement_type" },
                      { header: "Quantidade", accessor: "quantity" },
                      { header: "Responsável", accessor: "user.name" },
                    ]}
                    data={stockReports.stock_movements}
                  />
                </S.Section>
              </>
            ) : (
              <S.EmptyState>
                <Box size={48} color={theme.colors.text.secondary} />
                <S.EmptyStateText>
                  Não foi possível carregar o relatório de estoque
                </S.EmptyStateText>
                <Button onClick={fetchStockReports}>Tentar novamente</Button>
              </S.EmptyState>
            )}
          </>
        )}
      </S.Content>
    </S.PageContainer>
  );
};
