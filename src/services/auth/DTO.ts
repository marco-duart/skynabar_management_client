import { UserDTO } from "../user/DTO";
export namespace LoginDTO {
  export type Params = {
    email: string;
    password: string;
  };
  export type Response = {
    data: UserDTO.Model;
  };
}
