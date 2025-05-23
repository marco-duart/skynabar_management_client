import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/auth-context";
import {
  createProduct,
  getProducts,
  updateIdealQuantity,
  withdrawProduct,
  reverseWithdrawal,
  restockProduct,
  getShoppingList,
} from "../services/products";
import { IProduct } from "../services/products/DTO";

export const useProducts = () => {
  const { token } = useAuth();

  const [products, setProducts] = useState<IProduct.Model[]>([]);
  const [shoppingList, setShoppingList] = useState<IProduct.ShoppingListItem[]>(
    []
  );
  const [selectedProduct, setSelectedProduct] = useState<IProduct.Model | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (): Promise<void> => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getProducts(token);

      if (result.success && result.data) {
        setProducts(result.data);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao buscar produtos";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchShoppingList = useCallback(async (): Promise<void> => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getShoppingList(token);

      if (result.success && result.data) {
        setShoppingList(result.data);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao buscar lista de compras";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const addProduct = useCallback(
    async (
      params: Omit<IProduct.ICreateProduct.Params, "token">
    ): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await createProduct(params, token);

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

  const updateProductQuantity = useCallback(
    async (productId: number, idealQuantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await updateIdealQuantity(
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

  const removeFromStock = useCallback(
    async (productId: number, quantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await withdrawProduct(productId, { quantity }, token);

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

  const reverseWithdraw = useCallback(
    async (productId: number, quantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await reverseWithdrawal(productId, { quantity }, token);

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

  const restock = useCallback(
    async (productId: number, quantity: number): Promise<boolean> => {
      if (!token) return false;

      setIsLoading(true);

      try {
        const result = await restockProduct(productId, { quantity }, token);

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

  const selectProduct = (product: IProduct.Model | null) => {
    setSelectedProduct(product);
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
    error,

    fetchProducts,
    fetchShoppingList,

    addProduct,
    updateProductQuantity,
    removeFromStock,
    reverseWithdraw,
    restock,

    selectProduct,

    hasProducts: products.length > 0,
    hasShoppingItems: shoppingList.length > 0,
  };
};
