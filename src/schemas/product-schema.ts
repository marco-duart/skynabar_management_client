import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  sku: z
    .string()
    .min(3, "O SKU deve ter pelo menos 3 caracteres")
    .max(50, "O SKU deve ter no máximo 50 caracteres"),
  product_category_id: z
    .number({
      required_error: "Selecione uma categoria",
      invalid_type_error: "Selecione uma categoria",
    })
    .positive("Selecione uma categoria válida"),
  unit_type: z.number(),
  current_quantity: z.number().min(0, "A quantidade não pode ser negativa"),
  ideal_quantity: z.number().min(0, "A quantidade não pode ser negativa"),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const productResolver = zodResolver(productSchema);
