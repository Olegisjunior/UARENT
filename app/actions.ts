"use server";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";

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
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (user) {
      await prisma.user.update({
        where: {
          id: Number(user.id),
        },
        data: {
          email: body.email,
          name: body.name,
          password: hashSync(body.password, 10),
        },
      });
    } else {
      throw new Error("Користувач не найдений");
    }
  } catch (error) {
    console.log("Error [UPDATE_USER]", error);
    throw error;
  }
}
