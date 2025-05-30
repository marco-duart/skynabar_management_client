import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  ColumnResizeMode,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useProducts } from '../../hooks/use-products';
import { IProduct } from '../../services/products/DTO';
import * as S from './styles';
import { useTheme } from 'styled-components';
import { Edit, Trash, Plus, Minus, Rotate } from '@styled-icons/fa-solid';
import useMediaQuery from '../../hooks/use-media-query';
import { Button } from '../ui/button';

export const ProductsTable = () => {
  const theme = useTheme();
  const {
    products,
    isLoading,
    removeFromStock,
    restock,
    selectProduct,
    selectedProduct,
  } = useProducts();
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');
  const isTabletOrLarger = useMediaQuery(theme.mediaQuery.tablet);

  const columns: ColumnDef<IProduct.Model>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: info => info.getValue(),
      size: 200,
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
      cell: info => info.getValue(),
      size: 120,
    },
    {
      accessorKey: 'current_quantity',
      header: 'Estoque Atual',
      cell: info => info.getValue(),
      size: 120,
    },
    {
      accessorKey: 'ideal_quantity',
      header: 'Estoque Ideal',
      cell: info => info.getValue(),
      size: 120,
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <S.ActionsContainer>
          <Button
            variant="icon"
            onClick={() => selectProduct(row.original)}
            aria-label="Editar"
          >
            <Edit size={16} color={theme.colors.primary.main} />
          </Button>
          <Button
            variant="icon"
            onClick={() => removeFromStock(row.original.id, 1)}
            aria-label="Retirar"
          >
            <Minus size={16} color={theme.colors.status.error} />
          </Button>
          <Button
            variant="icon"
            onClick={() => restock(row.original.id, 1)}
            aria-label="Reabastecer"
          >
            <Plus size={16} color={theme.colors.status.success} />
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
        {products.map(product => (
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
            </S.CardBody>
            
            <S.CardFooter>
              <Button
                variant="icon"
                onClick={() => removeFromStock(product.id, 1)}
                aria-label="Retirar"
              >
                <Minus size={16} color={theme.colors.status.error} />
              </Button>
              <Button
                variant="icon"
                onClick={() => restock(product.id, 1)}
                aria-label="Reabastecer"
              >
                <Plus size={16} color={theme.colors.status.success} />
              </Button>
              <Button
                variant="icon"
                onClick={() => selectProduct(product)}
                aria-label="Editar"
              >
                <Edit size={16} color={theme.colors.primary.main} />
              </Button>
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
          {table.getHeaderGroups().map(headerGroup => (
            <S.TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
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
          {table.getRowModel().rows.map(row => (
            <S.TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
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