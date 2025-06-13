import { isAxiosError } from "axios";
import api from "../api";
import { IProductCategory } from "./DTO";

export const createProductCategoryService = async (
  params: IProductCategory.ICreateProductCategory.Params,
  token: string
) => {
  try {
    const response =
      await api.post<IProductCategory.ICreateProductCategory.Response>(
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

export const getProductCategoriesService = async (token: string) => {
  try {
    const response =
      await api.get<IProductCategory.IGetProductCategories.Response>(
        "/product_categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    return {
      success: true,
      message: "Categorias obtidas com sucesso",
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

export const updateProductCategoryService = async (
  productCategoryId: number,
  params: IProductCategory.IUpdateProductCategory.Params,
  token: string
) => {
  try {
    const response =
      await api.patch<IProductCategory.IUpdateProductCategory.Response>(
        `/products/${productCategoryId}/product_categories`,
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    return {
      success: true,
      message: "Categoria atualizada com sucesso",
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
      message: "Erro desconhecido ao atualizar quantidade ideal",
    };
  }
};
