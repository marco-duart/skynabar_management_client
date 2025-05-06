import { isAxiosError } from "axios";
import api from "../api";
import { IAuth } from "./DTO";

export const register = async (params: IAuth.IRegister.Params) => {
  try {
    const response = await api.post<IAuth.IRegister.Response>("/auth", params);
    return {
      success: true,
      message: "Usuário cadastrado com sucesso",
      data: response.data.data,
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
      message: "Erro desconhecido ao cadastrar usuário",
    };
  }
};

export const login = async (params: IAuth.ILogin.Params) => {
  try {
    const response = await api.post<IAuth.ILogin.Response>("/auth/sign_in", params);
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