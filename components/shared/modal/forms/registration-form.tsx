"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormSchema, TRegisterFormValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../form";
import { Button } from "@/components/ui/button";
import { regUser } from "@/app/actions";
import { toast } from "react-toastify";

interface Props {
  onClose?: VoidFunction;
  onSwitch: () => void;
}
const notify = () => toast.success("Реєстрація успішна");
const notifyError = () => toast.error("Помилка реєстрації");

export const RegisterForm: React.FC<Props> = ({ onClose, onSwitch }) => {
  const form = useForm<TRegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await regUser(data);

      onSwitch();
      notify();
      onClose?.();
    } catch (error) {
      notifyError();
      console.log("Error [CREATE_USER]", error);
      throw error;
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold">Зареєструвати аккаунт</h1>
          </div>
        </div>

        <FormInput name="email" label="Електронна пошта" required />
        <FormInput name="name" label="Ім'я" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Пароль"
          type="password"
          required
        />

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="h-12 text-base"
        >
          Зареєструватися
        </Button>
      </form>
    </FormProvider>
  );
};
