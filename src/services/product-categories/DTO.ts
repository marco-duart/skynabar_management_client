export namespace IProductCategory {
  export interface Model {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
  }

  export namespace ICreateProductCategory {
    export type Params = {
      name: string;
      description?: string;
    };
    export type Response = Model;
  }

  export namespace IGetProductCategories {
    export type Response = Model[];
  }

  export namespace IUpdateProductCategory {
    export type Params = {
      name?: string;
      description?: string | null;
    };
    export type Response = Model;
  }
}
