import { isAxiosError } from "axios";
import api from "../api";
import { LoginDTO } from "./DTO";

export const LoginService = async (params: LoginDTO.Params) => {
  try {
    const response = await api.post<LoginDTO.Response>("/auth/sign_in", params);
    return {
      success: true,
      message: "Login realizado com sucesso",
      data: response.data.data,
      token: response.headers.authorization?.replace("Bearer ", "").trim(),
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
    return {
      success: false,
      message: "Erro desconhecido ao fazer login",
    };
  }
};