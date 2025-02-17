"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Container } from "../container";
import { User } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  TRegisterFormValues,
} from "../modal/forms/schemas";
import { FormInput } from "./form-input";
import { updateUserInfo } from "@/app/actions";
import { toast } from "react-toastify";

type Props = {
  data: User;
};

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const isEditable = data.provider === null;

  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const notify = () => toast.success("Редагування прошло успішно!");
  const notify2 = () => toast.error("Редагування не прошло успішно!");

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      notify();
    } catch (error) {
      notify2();
      console.error(error);
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10 flex flex-col justify-center items-center mx-5 lg:mx-auto ">
      <h1 className="font-bold text-2xl">Особисті дані</h1>
      {!isEditable && (
        <p className="text-red-500 text-sm mt-2">
          Ви авторизовані через {data.provider}. Зміна даних недоступна.
        </p>
      )}
      <FormProvider {...form}>
        <form
          className="flex flex-col justify-center items-center gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            className="w-[300px] lg:w-[500px]"
            name="email"
            label="Електронна пошта"
            required
            disabled={!isEditable}
          />
          <FormInput
            className="w-[300px] lg:w-[500px]"
            name="name"
            label="Ім'я"
            required
            disabled={!isEditable}
          />

          <FormInput
            className="w-[300px] lg:w-[500px]"
            type="password"
            name="password"
            label="Новий пароль"
            required
            disabled={!isEditable}
          />
          <FormInput
            className="w-[300px] lg:w-[500px]"
            type="password"
            name="confirmPassword"
            label="Повторіть пароль"
            required
            disabled={!isEditable}
          />

          <Button
            disabled={!isEditable || form.formState.isSubmitting}
            className="text-base w-[200px]"
            type="submit"
          >
            Зберегти
          </Button>

          <Button
            onClick={onClickSignOut}
            disabled={form.formState.isSubmitting}
            className="text-base w-[200px]"
            type="button"
          >
            Вийти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
