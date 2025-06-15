import * as S from "./styles";
import useMediaQuery from "../../hooks/use-media-query";
import { ReactNode } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (data: T) => ReactNode;
  mobilePriority?: boolean;
};

type Props<T extends Record<string, any>> = {
  columns: Column<T>[];
  data: T[];
  mobileBreakpoint?: number;
};

const getNestedValue = <T extends Record<string, any>>(
  obj: T,
  path: string
): ReactNode => {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, any>)[key];
    }
    return undefined;
  }, obj as any);
};

export const ReportTable = <T extends Record<string, any>>({
  columns,
  data,
  mobileBreakpoint = 768,
}: Props<T>) => {
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

  if (isMobile && data.length > 0) {
    return (
      <S.MobileContainer>
        {data.map((item, index) => (
          <S.ProductCard key={index}>
            <S.CardHeader>
              <div>
                {item.formatted_created_at && (
                  <S.DateHighlight>{item.formatted_created_at}</S.DateHighlight>
                )}
                <S.ProductName>
                  {item.product?.name || item.name || "N/A"}
                </S.ProductName>
                {item.sku && <S.ProductSku>{item.sku}</S.ProductSku>}
              </div>
            </S.CardHeader>
            <S.CardBody>
              {columns
                .filter((col) => col.mobilePriority)
                .map((column) => (
                  <S.QuantityInfo key={column.accessor.toString()}>
                    <span>{column.header}</span>
                    <S.QuantityValue>
                      {column.render
                        ? column.render(item)
                        : typeof column.accessor === "string" &&
                          column.accessor.includes(".")
                        ? getNestedValue(item, column.accessor)
                        : item[column.accessor as keyof T]}
                    </S.QuantityValue>
                  </S.QuantityInfo>
                ))}
            </S.CardBody>
          </S.ProductCard>
        ))}
      </S.MobileContainer>
    );
  }

  return (
    <S.TableContainer>
      <S.StyledTable>
        <S.TableHead>
          <S.TableRow>
            {columns.map((column) => (
              <S.TableHeader key={column.accessor.toString()}>
                {column.header}
              </S.TableHeader>
            ))}
          </S.TableRow>
        </S.TableHead>
        <S.TableBody>
          {data.map((row, index) => (
            <S.TableRow key={index}>
              {columns.map((column) => (
                <S.TableCell key={`${index}-${column.accessor.toString()}`}>
                  {column.render
                    ? column.render(row)
                    : typeof column.accessor === "string" &&
                      column.accessor.includes(".")
                    ? getNestedValue(row, column.accessor)
                    : row[column.accessor as keyof T]}
                </S.TableCell>
              ))}
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.StyledTable>
    </S.TableContainer>
  );
};
