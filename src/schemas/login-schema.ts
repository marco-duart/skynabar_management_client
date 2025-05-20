import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 dígitos"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginResolver = zodResolver(loginSchema);
