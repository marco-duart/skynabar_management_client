import { isAxiosError } from "axios";
import api from "../api";
import { ProductCategoryDTO } from "./DTO";

export const createProductCategoryService = async (
  params: ProductCategoryDTO.ICreateProductCategory.Params,
  token: string
) => {
  try {
    const response =
      await api.post<ProductCategoryDTO.ICreateProductCategory.Response>(
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
      await api.get<ProductCategoryDTO.IGetProductCategories.Response>(
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
  params: ProductCategoryDTO.IUpdateProductCategory.Params,
  token: string
) => {
  try {
    const response =
      await api.patch<ProductCategoryDTO.IUpdateProductCategory.Response>(
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
