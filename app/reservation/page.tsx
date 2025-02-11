"use server";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import React from "react";
import { ReservationList } from "@/components/shared";

export const metadata = async () => {
  return {
    title: "Резервації",
  };
};

export default async function ReservationPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  const reservations = await prisma.reservation.findMany({
    where: { customerId: user?.id },
    include: { car: true },
  });

  if (reservations.length === 0) {
    return (
      <div className="container mx-auto my-5 bg-white rounded-xl p-5 h-[800px] flex justify-center items-center ">
        <div className="flex justify-center items-center text-xl font-bold flex-col gap-5">
          <p>Замовлень не знайдено!</p>
          <Button>
            <Link href="/">Повернутись на головну</Link>
          </Button>
        </div>
      </div>
    );
  }

  const sortedReservations = reservations.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <>
      <ReservationList
        reservations={reservations}
        sortedReservations={sortedReservations}
      />
    </>
  );
}
