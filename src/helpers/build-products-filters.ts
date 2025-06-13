import { IProduct } from "../services/products/DTO";

export const buildProductFilters = (filters: {
  name?: string;
  sku?: string;
  productCategoryId?: number;
}): IProduct.IGetProducts.Params => {
  const q: any = {};

  if (filters.name) q.name_cont = filters.name;
  if (filters.sku) q.sku_eq = filters.sku;
  if (filters.productCategoryId)
    q.product_category_id_eq = filters.productCategoryId;

  return { ...q };
};
