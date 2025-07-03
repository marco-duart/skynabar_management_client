import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/auth-context";
import {
  createProductService,
  getProductsService,
  updateIdealQuantityService,
  withdrawProductService,
  reverseWithdrawalService,
  restockProductService,
  getShoppingListService,
} from "../services/products";
import { ProductDTO } from "../services/products/DTO";

export interface TranslatedProduct extends ProductDTO.Model {
  translated_unit: string;
}

export interface TranslatedShoppingListItem
  extends ProductDTO.ShoppingListItem {
  translated_unit: string;
}

export const useProducts = () => {
  const { token } = useAuth();

  const [products, setProducts] = useState<TranslatedProduct[]>([]);
  const [shoppingList, setShoppingList] = useState<
    TranslatedShoppingListItem[]
  >([]);
  const [selectedProduct, setSelectedProduct] =
    useState<TranslatedProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async (): Promise<void> => {
    if (!token) return;

    setIsLoading(true);

    try {
      const result = await getProductsService(token);

      if (result.success && result.data) {
        const translatedProducts = result.data.map((product) => ({
          ...product,
          translated_unit: translateUnitType(product.unit_type),
        }));
        setProducts(translatedProducts);
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

  const fetchShoppingList = useCallback(async (): Promise<void> => {
    if (!token) return;

    setIsLoading(true);

    try {
      const result = await getShoppingListService(token);

      if (result.success && result.data) {
        const translatedItems = result.data.map((item) => ({
          ...item,
          translated_unit: translateUnitType(item.unit_type),
        }));
        setShoppingList(translatedItems);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao buscar lista de compras";
      console.log(message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const createProduct = useCallback(
    async (params: ProductDTO.ICreateProduct.Params): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await createProductService(params, token);

        if (result.success && result.data) {
          toast.success(result.message);
          await fetchProducts();
          await fetchShoppingList();
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
    [token, fetchProducts, fetchShoppingList]
  );

  const updateIdealProductQuantity = useCallback(
    async (productId: number, idealQuantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await updateIdealQuantityService(
          productId,
          { ideal_quantity: idealQuantity },
          token
        );

        if (result.success && result.data) {
          toast.success(result.message);
          await fetchProducts();
          await fetchShoppingList();
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
    [token, fetchProducts, fetchShoppingList]
  );

  const withdrawProduct = useCallback(
    async (productId: number, quantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await withdrawProductService(
          productId,
          { quantity },
          token
        );

        if (result.success && result.data) {
          toast.success(result.message);
          await fetchProducts();
          await fetchShoppingList();
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (err) {
        toast.error("Erro ao retirar produto do estoque");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchProducts, fetchShoppingList]
  );

  const reverseWithdrawal = useCallback(
    async (productId: number, quantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await reverseWithdrawalService(
          productId,
          { quantity },
          token
        );

        if (result.success && result.data) {
          toast.success(result.message);
          await fetchProducts();
          await fetchShoppingList();
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (err) {
        toast.error("Erro ao estornar retirada");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchProducts, fetchShoppingList]
  );

  const restockProduct = useCallback(
    async (productId: number, quantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await restockProductService(
          productId,
          { quantity },
          token
        );

        if (result.success && result.data) {
          toast.success(result.message);
          await fetchProducts();
          await fetchShoppingList();
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (err) {
        toast.error("Erro ao reabastecer produto");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token, fetchProducts, fetchShoppingList]
  );

  const selectProduct = (product: TranslatedProduct | null) => {
    setSelectedProduct(product);
  };

  const translateUnitType = (
    unit: keyof typeof ProductDTO.UnitEnum
  ): string => {
    return ProductDTO.UnitLabels[unit] || unit;
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchShoppingList();
    }
  }, [token, fetchProducts, fetchShoppingList]);

  return {
    products,
    shoppingList,
    selectedProduct,
    isLoading,

    fetchProducts,
    fetchShoppingList,

    createProduct,
    updateIdealProductQuantity,
    withdrawProduct,
    reverseWithdrawal,
    restockProduct,

    selectProduct,

    hasProducts: products.length > 0,
    hasShoppingItems: shoppingList.length > 0,
  };
};
