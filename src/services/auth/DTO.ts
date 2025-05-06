export namespace IAuth {
  export interface User {
    id: number;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    document: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  }

  export namespace IRegister {
    export type Params = {
      email: string;
      document: string;
      password: string;
      password_confirmation: string;
      name: string;
      role: number;
    };
    export type Response = {
      status: string;
      data: User;
    };
  }

  export namespace ILogin {
    export type Params = {
      email: string;
      password: string;
    };
    export type Response = {
      data: User;
    };
  }
}