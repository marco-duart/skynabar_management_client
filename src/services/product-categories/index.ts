import { isAxiosError } from "axios";
import api from "../api";
import { IProductCategory } from "./dto";

export const createProductCategory = async (
  params: IProductCategory.ICreateProductCategory.Params,
  token: string
) => {
  try {
    const response = await api.post<IProductCategory.ICreateProductCategory.Response>(
      "/product_categories",
      params,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: "Categoria criada com sucesso",
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
      message: "Erro desconhecido ao criar categoria",
    };
  }
};