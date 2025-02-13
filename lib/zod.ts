import { string, object } from "zod";

export const RegisterSchema = object({
  name: string().min(4, "Harus lebih dari 4 character"),
  email: string().email("email tidak valid"),
  password: string()
    .min(8, "Password minimal 8 character")
    .max(32, "Password maksimal 32 Character"),
  ConfirmPassword: string()
    .min(8, "Password minimal 8 character")
    .max(32, "Password maksimal 32 Character"),
}).refine((data) => data.password === data.ConfirmPassword, {
    message: "Password tidak cocok",
    path: ["ConfirmPassowrd"], 
});

export const SignInSchema = object({
    email: string().email("email tidak valid"),
    password: string()
    .min(8, "Password minimal 8 character")
    .max(32, "Password maksimal 32 Character"), 
})