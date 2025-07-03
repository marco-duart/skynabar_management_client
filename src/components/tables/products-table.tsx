import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  ColumnResizeMode,
} from "@tanstack/react-table";
import { useState } from "react";
import { useProducts, TranslatedProduct } from "../../hooks/use-products";
import * as S from "./styles";
import { useTheme } from "styled-components";
import { Edit, Trash, Plus, Minus, Rotate } from "@styled-icons/fa-solid";
import useMediaQuery from "../../hooks/use-media-query";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/auth-context";

interface Props {
  onEditProduct: (product: TranslatedProduct) => void;
}

export const ProductsTable = ({ onEditProduct }: Props) => {
  const theme = useTheme();
  const { isManager } = useAuth();
  const { products, isLoading, withdrawProduct, restockProduct } =
    useProducts();
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange");
  const isTabletOrLarger = useMediaQuery(theme.mediaQuery.tablet);
  const userIsManager = isManager();

  const columns: ColumnDef<TranslatedProduct>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: (info) => info.getValue(),
      size: 200,
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: (info) => info.getValue(),
      size: 120,
    },
    {
      accessorKey: "current_quantity",
      header: "Estoque Atual",
      cell: (info) => info.getValue(),
      size: 80,
    },
    {
      accessorKey: "ideal_quantity",
      header: "Estoque Ideal",
      cell: (info) => info.getValue(),
      size: 80,
    },
    {
      accessorKey: "translated_unit",
      header: "Medida",
      cell: (info) => info.getValue(),
      size: 80,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <S.ActionsContainer>
          {userIsManager && (
            <Button
              variant="secondary"
              onClick={() => onEditProduct(row.original)}
              aria-label="Editar"
            >
              Editar
            </Button>
          )}
          <Button
            variant="info"
            onClick={() => withdrawProduct(row.original.id, 1)}
            aria-label="Retirar"
          >
            Retirar
          </Button>
          <Button
            variant="success"
            onClick={() => restockProduct(row.original.id, 1)}
            aria-label="Reabastecer"
          >
            Reabastecer
          </Button>
        </S.ActionsContainer>
      ),
      size: 150,
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (!isTabletOrLarger) {
    return (
      <S.MobileContainer>
        {products.map((product) => (
          <S.ProductCard key={product.id}>
            <S.CardHeader>
              <S.ProductName>{product.name}</S.ProductName>
              <S.ProductSku>{product.sku}</S.ProductSku>
            </S.CardHeader>

            <S.CardBody>
              <S.QuantityInfo>
                <span>Estoque:</span>
                <S.QuantityValue>{product.current_quantity}</S.QuantityValue>
              </S.QuantityInfo>

              <S.QuantityInfo>
                <span>Ideal:</span>
                <S.QuantityValue>{product.ideal_quantity}</S.QuantityValue>
              </S.QuantityInfo>

              <S.QuantityInfo>
                <span>Medida:</span>
                <S.QuantityValue>{product.translated_unit}</S.QuantityValue>
              </S.QuantityInfo>
            </S.CardBody>

            <S.CardFooter>
              <Button
                variant="icon"
                onClick={() => withdrawProduct(product.id, 1)}
                aria-label="Retirar"
              >
                <Minus size={16} color={theme.colors.status.info} />
              </Button>
              <Button
                variant="icon"
                onClick={() => restockProduct(product.id, 1)}
                aria-label="Reabastecer"
              >
                <Plus size={16} color={theme.colors.status.success} />
              </Button>
              {userIsManager && (
                <Button
                  variant="icon"
                  onClick={() => onEditProduct(product)}
                  aria-label="Editar"
                >
                  <Edit size={16} color={theme.colors.primary.main} />
                </Button>
              )}
            </S.CardFooter>
          </S.ProductCard>
        ))}
      </S.MobileContainer>
    );
  }

  return (
    <S.TableContainer>
      <S.Table>
        <S.TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <S.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <S.TableHeader
                  key={header.id}
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </S.TableHeader>
              ))}
            </S.TableRow>
          ))}
        </S.TableHead>
        <S.TableBody>
          {table.getRowModel().rows.map((row) => (
            <S.TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <S.TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </S.TableCell>
              ))}
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
  );
};
