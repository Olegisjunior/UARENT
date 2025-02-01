import { z } from "zod";

export const passwordSchema = z.string().min(6, { message: "Пароль повинен містити мінімум 8 символів" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введіть коректну пошту" }),
  password: passwordSchema,
});

export const RegisterFormSchema = formLoginSchema
  .merge(
    z.object({
      name: z.string().min(2, { message: "Ім'я повинно містити мінімум 2 символи" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, { message: "Паролі не співпадають", path: ["confirmPassword"] });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TRegisterFormValues = z.infer<typeof RegisterFormSchema>;
