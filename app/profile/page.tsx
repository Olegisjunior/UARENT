"use server";
import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { ProfileForm } from "@/components/shared/form";

export const metadata = async () => {
  return {
    title: "Профіль",
  };
};

export default async function profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.user.id),
    },
  });

  if (!user) {
    return redirect("/not-auth");
  }
  return <ProfileForm data={user} />;
}
