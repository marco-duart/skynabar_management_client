import { useState } from "react";
import { useProducts } from "../../hooks/use-products";
import { ProductsTable } from "../../components/tables/products-table";
import * as S from "./styles";
import { LoadingSpinner } from "../../components/loading-spinner";
import { EmptyState } from "../../components/ui/empty-state";
import { Box, Plus } from "@styled-icons/fa-solid";
import { theme } from "../../assets/styles/theme";
import { useAuth } from "../../contexts/auth-context";
import { Button } from "../../components/ui/button";
import { Modal } from "../../components/ui/modal";
import { ProductForm } from "../../components/forms/product-form";
import { IProduct } from "../../services/products/DTO";
import { ProductFormData } from "../../schemas/product-schema";

export const HomePage = () => {
  const { isManager } = useAuth();
  const {
    isLoading,
    hasProducts,
    createProduct,
    selectedProduct,
    selectProduct,
    updateIdealProductQuantity,
  } = useProducts();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const handleCreateProduct = async (formData: ProductFormData) => {
    setIsProductLoading(true);
    try {
      const data: IProduct.ICreateProduct.Params = {
        product: {
          name: formData.name,
          sku: formData.sku,
          product_category_id: formData.product_category_id,
          unit_type: Object.keys(IProduct.UnitEnum).find(
            (key) =>
              IProduct.UnitEnum[key as keyof typeof IProduct.UnitEnum] ===
              formData.unit_type
          ) as keyof typeof IProduct.UnitEnum,
          current_quantity: formData.current_quantity,
          ideal_quantity: formData.ideal_quantity,
        },
      };

      const success = await createProduct(data);
      return success;
    } finally {
      setIsProductLoading(false);
    }
  };

  const handleUpdateProduct = async (formData: ProductFormData) => {
    if (!selectedProduct) return false;

    setIsProductLoading(true);
    try {
      const success = await updateIdealProductQuantity(
        selectedProduct.id,
        formData.ideal_quantity
      );
      return success;
    } finally {
      setIsProductLoading(false);
    }
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Gestão de Estoque</S.Title>
        {isManager() && (
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            aria-label="Criar produto"
          >
            <Plus size={16} />
            Criar Produto
          </Button>
        )}
      </S.Header>

      <S.Content>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {hasProducts ? (
              <ProductsTable />
            ) : (
              <EmptyState
                icon={<Box size={48} color={theme.colors.text.secondary} />}
                title="Nenhum produto cadastrado"
                description="Comece adicionando seu primeiro produto ao estoque"
              />
            )}
          </>
        )}
      </S.Content>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Novo Produto"
      >
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isProductLoading}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          selectProduct(null);
        }}
        title="Editar Produto"
      >
        {selectedProduct && (
          <ProductForm
            onSubmit={handleUpdateProduct}
            defaultValues={selectedProduct}
            onCancel={() => {
              setIsEditModalOpen(false);
              selectProduct(null);
            }}
            isLoading={isProductLoading}
          />
        )}
      </Modal>
    </S.PageContainer>
  );
};
