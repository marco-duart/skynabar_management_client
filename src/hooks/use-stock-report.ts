import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/auth-context";
import { getStockReportService } from "../services/stock-reports";
import { IStockReport } from "../services/stock-reports/DTO";
import { UserDTO } from "../services/user/DTO";
import { ProductDTO } from "../services/products/DTO";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TranslatedStockMovement extends IStockReport.Model {
  translated_unit: string;
  formatted_created_at: string;
}

interface TranslatedProduct extends ProductDTO.Model {
  translated_unit: string;
  formatted_created_at: string;
}

interface TranslatedStockReport {
  stock_movements: Array<
    TranslatedStockMovement & {
      product: TranslatedProduct;
      user: UserDTO.Model;
    }
  >;
  indicators: {
    most_moved_products: Array<{
      id: number;
      name: string;
      sku: string;
      total_movement: string;
      translated_unit: string;
    }>;
    low_stock_products: TranslatedProduct[];
    movement_stats: IStockReport.GetStockReport.Response["indicators"]["movement_stats"];
    recent_activity: IStockReport.GetStockReport.Response["indicators"]["recent_activity"];
  };
}

export const useStockReport = () => {
  const { token } = useAuth();

  const [stockReports, setStockReports] = useState<TranslatedStockReport>();
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = useCallback((dateString: string): string => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "Data inválida"
        : format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return "Data inválida";
    }
  }, []);

  const translateUnitType = useCallback(
    (unit: keyof typeof ProductDTO.UnitEnum): string => {
      return ProductDTO.UnitLabels[unit] || unit;
    },
    []
  );

  const fetchStockReports = useCallback(async (): Promise<void> => {
    if (!token) return;

    setIsLoading(true);

    try {
      const result = await getStockReportService({ token });

      if (result.success && result.data) {
        const formattedData: TranslatedStockReport = {
          stock_movements: result.data.stock_movements.map((movement) => ({
            ...movement,
            translated_unit: translateUnitType(movement.product.unit_type),
            formatted_created_at: formatDate(movement.created_at),
            movement_type:
              movement.movement_type === "input"
                ? "Entrada"
                : movement.movement_type === "output"
                ? "Saída"
                : "Ajuste",
            product: {
              ...movement.product,
              translated_unit: translateUnitType(movement.product.unit_type),
              formatted_created_at: formatDate(movement.product.created_at),
            },
          })),
          indicators: {
            ...result.data.indicators,
            most_moved_products: result.data.indicators.most_moved_products.map(
              (product) => ({
                ...product,
                translated_unit: translateUnitType(
                  product.unit_type as keyof typeof ProductDTO.UnitEnum
                ),
              })
            ),
            low_stock_products: result.data.indicators.low_stock_products.map(
              (product) => ({
                ...product,
                translated_unit: translateUnitType(product.unit_type),
                formatted_created_at: formatDate(product.created_at),
              })
            ),
          },
        };

        setStockReports(formattedData);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao buscar relatório";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [token, formatDate, translateUnitType]);

  useEffect(() => {
    if (token) {
      fetchStockReports();
    }
  }, [token, fetchStockReports]);

  return {
    stockReports,
    isLoading,
    fetchStockReports,
    formatDate,
    translateUnitType,
  };
};
