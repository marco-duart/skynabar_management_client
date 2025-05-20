export namespace UserDTO {
  export enum Role {
    MANAGER = "manager",
    EMPLOYEE = "employee",
  }
  export interface Model {
    id: number;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    document: string;
    email: string;
    role: Role;
    created_at: string;
    updated_at: string;
  }
}
