import { ProductDTO } from "../products/DTO";
import { UserDTO } from "../user/DTO";

export namespace IStockReport {
  export interface Model {
    id: number;
    quantity: string;
    movement_type: string;
    notes: string;
    created_at: string;
    updated_at: string;
  }

  export namespace GetStockReport {
    export type Params = {
      token: string;
    };
    export type Response = {
      stock_movements: Array<
        Model & {
          product: ProductDTO.Model;
          user: UserDTO.Model;
        }
      >;
      indicators: {
        most_moved_products: {
          id: number;
          name: string;
          sku: string;
          total_movement: string;
          unit_type: string;
        }[];
        low_stock_products: ProductDTO.Model[];
        movement_stats: {
          inputs: string;
          outputs: string;
          adjustments: number;
          total_movements: number;
        };
        recent_activity: {
          [date: string]: number;
        };
      };
    };
  }
}
