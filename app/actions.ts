"use server";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { getSession } from "next-auth/react";

export async function regUser(data: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new Error("Користувач з такою поштою вже існує");
    }

    const createdUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashSync(data.password, 10),
      },
    });

    return createdUser;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getSession();

    if (!currentUser) {
      throw new Error("Користувач не найдений");
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.user.id),
      },
      data: {
        ...body,
        password: hashSync(body.password, 10),
      },
    });
  } catch (error) {
    console.log("Error [UPDATE_USER]", error);
    throw error;
  }
}
