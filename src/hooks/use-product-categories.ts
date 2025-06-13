import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/auth-context";
import {
  createProductCategoryService,
  getProductCategoriesService,
  updateProductCategoryService,
} from "../services/product-categories";
import { IProductCategory } from "../services/product-categories/DTO";

export const useProductCategories = () => {
  const { token } = useAuth();

  const [productCategories, setProductCategories] = useState<
    IProductCategory.Model[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductCategories = useCallback(async (): Promise<void> => {
    if (!token) return;

    setIsLoading(true);

    try {
      const result = await getProductCategoriesService(token);

      if (result.success && result.data) {
        setProductCategories(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao buscar produtos";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const createProductCategory = useCallback(
    async (
      params: IProductCategory.ICreateProductCategory.Params
    ): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await createProductCategoryService(params, token);

        if (result.success && result.data) {
          toast.success(result.message);
          await fetchProductCategories();
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (err) {
        toast.error("Erro ao criar produto");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchProductCategories]
  );

  const updateProductCategory = useCallback(
    async (
      productCategoryId: number,
      params: IProductCategory.ICreateProductCategory.Params
    ): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await updateProductCategoryService(
          productCategoryId,
          params,
          token
        );

        if (result.success && result.data) {
          toast.success(result.message);
          await fetchProductCategories();
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (err) {
        toast.error("Erro ao atualizar quantidade ideal");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchProductCategories]
  );

  useEffect(() => {
    if (token) {
      fetchProductCategories();
    }
  }, [token, fetchProductCategories]);

  return {
    productCategories,
    isLoading,
    fetchProductCategories,
    createProductCategory,
    updateProductCategory,
  };
};
