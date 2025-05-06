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
}