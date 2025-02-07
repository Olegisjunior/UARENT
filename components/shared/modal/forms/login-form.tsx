import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TFormLoginValues, formLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const notify = () => toast.success("Успішний вхід");
  const notifyError = () => toast.error("Помилка входу");

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", { ...data, redirect: false });

      if (!resp?.ok) {
        throw Error();
      }

      notify();

      onClose?.();
    } catch (error) {
      notifyError();
      console.log("Error [LOGIN]", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center flex-col mx-auto">
            <h1 className="text-2xl font-bold">Вхід в аккаунт</h1>
            <p className="text-[#90A3BF]">
              Введіть пошту, щоб увійти в свій аккаунт
            </p>
          </div>
        </div>

        <FormInput name="email" label="Електронна пошта" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="h-12 text-base"
        >
          Увійти
        </Button>
      </form>
    </FormProvider>
  );
};
