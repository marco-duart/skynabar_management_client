import { isAxiosError } from "axios";
import api from "../api";
import { IStockReport } from "./DTO";

export const getStockReportService = async (
  params: IStockReport.GetStockReport.Params
) => {
  try {
    const { token } = params;

    const response = await api.get<IStockReport.GetStockReport.Response>(
      "/stock_movements/inventory_report",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Relatório recuperado com sucesso",
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
    return {
      success: false,
      message: "Erro desconhecido ao listar produtos",
    };
  }
};
