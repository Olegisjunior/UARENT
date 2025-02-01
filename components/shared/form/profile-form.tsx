"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Container } from "../container";
import { User } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, TRegisterFormValues } from "../modal/forms/schemas";
import { FormInput } from "./form-input";
import { updateUserInfo } from "@/app/actions";

type Props = {
  data: User;
};

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        name: data.name,
        password: data.password,
      });
    } catch (error) {
      alert("Помилка редагування");
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10 flex flex-col justify-center items-center ">
      <h1 className="font-bold text-2xl">Особисті дані</h1>
      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="Email" required />
          <FormInput name="name" label="Ім'я" required />

          <FormInput type="password" name="password" label="Новий пароль" required />
          <FormInput type="password" name="confirmPassword" label="Повторіть пароль" required />

          <Button disabled={form.formState.isSubmitting} className="text-base" type="submit">
            Зберегти
          </Button>

          <Button onClick={onClickSignOut} disabled={form.formState.isSubmitting} className="text-base" type="button">
            Вийти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
