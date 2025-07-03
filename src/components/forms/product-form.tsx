import { useForm } from "react-hook-form";
import { productResolver, ProductFormData } from "../../schemas/product-schema";
import { ProductDTO } from "../../services/products/DTO";
import { useProductCategories } from "../../hooks/use-product-categories";
import * as S from "../forms/styles";
import { LoadingSpinner } from "../loading-spinner";
import { useEffect } from "react";

interface Props {
  onSubmit: (data: ProductFormData) => Promise<boolean>;
  defaultValues?: Partial<ProductDTO.Model>;
  onCancel: () => void;
  isLoading: boolean;
  isEditMode?: boolean;
}

export const ProductForm = ({
  onSubmit,
  defaultValues,
  onCancel,
  isLoading,
  isEditMode = false,
}: Props) => {
  const { productCategories, isLoading: isCategoriesLoading } =
    useProductCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: productResolver,
  });

  useEffect(() => {
    if (defaultValues && !isCategoriesLoading) {
      const unitTypeValue =
        typeof defaultValues.unit_type === "string"
          ? ProductDTO.UnitEnum[
              defaultValues.unit_type as keyof typeof ProductDTO.UnitEnum
            ]
          : defaultValues.unit_type;

      reset({
        ...defaultValues,
        unit_type: unitTypeValue,
        current_quantity: defaultValues.current_quantity
          ? Number(defaultValues.current_quantity)
          : 0,
        ideal_quantity: defaultValues.ideal_quantity
          ? Number(defaultValues.ideal_quantity)
          : 0,
        product_category_id: defaultValues.product_category_id
          ? Number(defaultValues.product_category_id)
          : undefined,
      });
    } else if (!defaultValues) {
      reset({
        unit_type: ProductDTO.UnitEnum.unit,
        current_quantity: 0,
        ideal_quantity: 0,
      });
    }
  }, [defaultValues, reset, isCategoriesLoading]);

  const handleFormSubmit = async (data: ProductFormData) => {
    const success = await onSubmit(data);
    if (success) onCancel();
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <S.InputContainer>
        <S.Label htmlFor="name">Nome</S.Label>
        <S.Input
          id="name"
          placeholder="Digite o nome do produto"
          {...register("name")}
          disabled={isLoading || isEditMode}
        />
        {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
      </S.InputContainer>

      <S.InputContainer>
        <S.Label htmlFor="sku">SKU</S.Label>
        <S.Input
          id="sku"
          placeholder="Digite o SKU do produto"
          {...register("sku")}
          disabled={isLoading || isEditMode}
        />
        {errors.sku && <S.ErrorMessage>{errors.sku.message}</S.ErrorMessage>}
      </S.InputContainer>

      <S.InputContainer>
        <S.Label htmlFor="product_category_id">Categoria</S.Label>
        {isCategoriesLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <S.Select
              id="product_category_id"
              {...register("product_category_id", {
                valueAsNumber: true,
              })}
              disabled={isLoading || isEditMode}
            >
              <option value="">Selecione uma categoria</option>
              {productCategories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  selected={defaultValues?.product_category_id === category.id}
                >
                  {category.name}
                </option>
              ))}
            </S.Select>
            {errors.product_category_id && (
              <S.ErrorMessage>
                {errors.product_category_id.message}
              </S.ErrorMessage>
            )}
          </>
        )}
      </S.InputContainer>

      <S.InputContainer>
        <S.Label htmlFor="unit_type">Unidade de Medida</S.Label>
        <S.Select
          id="unit_type"
          {...register("unit_type", { valueAsNumber: true })}
          disabled={isLoading || isEditMode}
        >
          {Object.entries(ProductDTO.UnitEnum)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => (
              <option key={key} value={value}>
                {
                  ProductDTO.UnitLabels[
                    key as keyof typeof ProductDTO.UnitLabels
                  ]
                }
              </option>
            ))}
        </S.Select>
        {errors.unit_type && (
          <S.ErrorMessage>{errors.unit_type.message}</S.ErrorMessage>
        )}
      </S.InputContainer>

      <S.InputContainer>
        <S.Label htmlFor="current_quantity">Quantidade Atual</S.Label>
        <S.Input
          id="current_quantity"
          type="number"
          min="0"
          step="0.01"
          placeholder="Quantidade atual em estoque"
          {...register("current_quantity", {
            valueAsNumber: true,
          })}
          disabled={isLoading || isEditMode}
        />
        {errors.current_quantity && (
          <S.ErrorMessage>{errors.current_quantity.message}</S.ErrorMessage>
        )}
      </S.InputContainer>

      <S.InputContainer>
        <S.Label htmlFor="ideal_quantity">Quantidade Ideal</S.Label>
        <S.Input
          id="ideal_quantity"
          type="number"
          min="0"
          step="0.01"
          placeholder="Quantidade ideal em estoque"
          {...register("ideal_quantity", {
            valueAsNumber: true,
          })}
          disabled={isLoading}
        />
        {errors.ideal_quantity && (
          <S.ErrorMessage>{errors.ideal_quantity.message}</S.ErrorMessage>
        )}
      </S.InputContainer>

      <S.ButtonsContainer>
        <S.Button type="button" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </S.Button>
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "Salvar"}
        </S.SubmitButton>
      </S.ButtonsContainer>
    </S.FormContainer>
  );
};
