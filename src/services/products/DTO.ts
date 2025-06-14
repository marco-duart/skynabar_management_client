export namespace ProductDTO {
  export enum UnitEnum {
    unit = 0,
    liter = 1,
    kilogram = 2,
    bottle = 3,
    pack = 4,
    box = 5,
  }

  export const UnitLabels: Record<keyof typeof UnitEnum, string> = {
    unit: "Unidade",
    liter: "Litro",
    kilogram: "Quilo",
    bottle: "Garrafa",
    pack: "Pacote",
    box: "Caixa",
  };

  export interface Model {
    id: number;
    name: string;
    sku: string;
    unit_type: keyof typeof UnitEnum;
    current_quantity: string;
    ideal_quantity: string;
    product_category_id: number;
    created_at: string;
    updated_at: string;
  }

  export interface ShoppingListItem {
    id: number;
    name: string;
    current: string;
    ideal: string;
    to_buy: string;
    unit_type: keyof typeof UnitEnum;
  }

  export namespace ICreateProduct {
    export type Params = {
      product: {
        name: string;
        sku: string;
        unit_type: keyof typeof UnitEnum;
        current_quantity: number;
        ideal_quantity: number;
        product_category_id: number;
      };
    };
    export type Response = Model;
  }

  export namespace IGetProducts {
    export type Params = {
      name?: string;
      sku?: string;
      product_category_id?: number;
    };
    export type Response = Model[];
  }

  export namespace IUpdateIdealQuantity {
    export type Params = {
      ideal_quantity: number;
    };
    export type Response = Model;
  }

  export namespace IWithdrawProduct {
    export type Params = {
      quantity: number;
    };
    export type Response = Model;
  }

  export namespace IReverseWithdrawal {
    export type Params = {
      quantity: number;
    };
    export type Response = Model;
  }

  export namespace IRestockProduct {
    export type Params = {
      quantity: number;
    };
    export type Response = Model;
  }

  export namespace IGetShoppingList {
    export type Response = ShoppingListItem[];
  }
}
