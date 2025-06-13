import { isAxiosError } from "axios";
import api from "../api";
import { IProduct } from "./DTO";
import { buildProductFilters } from "../../helpers/build-products-filters";

export const createProductService = async (
  params: IProduct.ICreateProduct.Params,
  token: string
) => {
  try {
    const response = await api.post<IProduct.ICreateProduct.Response>(
      "/products",
      params,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: "Produto criado com sucesso",
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
      message: "Erro desconhecido ao criar produto",
    };
  }
};

export const getProductsService = async (
  token: string,
  filters?: {
    name?: string;
    sku?: string;
    productCategoryId?: number;
  }
) => {
  try {
    const ransackParams = filters ? buildProductFilters(filters) : undefined;

    const response = await api.get<IProduct.IGetProducts.Response>(
      "/products",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: ransackParams,
      }
    );

    return {
      success: true,
      message: "Produtos listados com sucesso",
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

export const updateIdealQuantityService = async (
  productId: number,
  params: IProduct.IUpdateIdealQuantity.Params,
  token: string
) => {
  try {
    const response = await api.patch<IProduct.IUpdateIdealQuantity.Response>(
      `/products/${productId}/update_ideal_quantity`,
      params,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: "Quantidade ideal atualizada com sucesso",
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

export const withdrawProductService = async (
  productId: number,
  params: IProduct.IWithdrawProduct.Params,
  token: string
) => {
  try {
    const response = await api.patch<IProduct.IWithdrawProduct.Response>(
      `/products/${productId}/withdraw_from_stock`,
      params,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: "Produto retirado com sucesso",
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
      message: "Erro desconhecido ao retirar produto",
    };
  }
};

export const reverseWithdrawalService = async (
  productId: number,
  params: IProduct.IReverseWithdrawal.Params,
  token: string
) => {
  try {
    const response = await api.patch<IProduct.IReverseWithdrawal.Response>(
      `/products/${productId}/reverse_withdrawal`,
      params,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: "Estorno realizado com sucesso",
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
      message: "Erro desconhecido ao estornar produto",
    };
  }
};

export const restockProductService = async (
  productId: number,
  params: IProduct.IRestockProduct.Params,
  token: string
) => {
  try {
    const response = await api.patch<IProduct.IRestockProduct.Response>(
      `/products/${productId}/restock`,
      params,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: "Produto reabastecido com sucesso",
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
      message: "Erro desconhecido ao reabastecer produto",
    };
  }
};

export const getShoppingListService = async (token: string) => {
  try {
    const response = await api.get<IProduct.IGetShoppingList.Response>(
      "/products/shopping_list",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: "Lista de compras obtida com sucesso",
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
      message: "Erro desconhecido ao obter lista de compras",
    };
  }
};
