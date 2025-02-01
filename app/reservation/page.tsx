import { prisma } from "@/prisma/prisma-client";
import { format } from "date-fns";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import React from "react";

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

  // if (!reservations.some((res) => res.customerId === user?.id) && user?.role !== "ADMIN") {
  //   return (
  //     <div className="container mx-auto my-5 bg-white rounded-xl p-5">
  //       <div>Ви не маєте доступу до цього замовлення!</div>
  //     </div>
  //   );
  // }

  const sortedReservations = reservations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <>
      <div className="container mx-auto my-5 bg-white rounded-xl p-5 min-h-[800px] h-fit">
        <h1 className="text-2xl font-bold flex justify-center items-center p-2">Деталі замовлень</h1>

        {reservations.length > 0 &&
          sortedReservations.map((res) => (
            <div key={res.id * 24.35}>
              {sortedReservations.indexOf(res) === 0 ? null : <hr className="w-full bg-black h-[2px] opacity-20" />}
              <div className="flex gap-5 justify-between items-center p-5">
                <p className="text-[#85A8F8] w-[250px] text-center">Дата створення замовлення: {format(res.createdAt, "yyyy-MM-dd")}</p>
                <hr className="transform: -rotate-90 w-[120px] h-[2px] bg-black opacity-20"></hr>
                <div className="flex-1 ">
                  <p>
                    Машина: <i>{res.car.name}</i>
                  </p>
                  <p>
                    Дата і час початку:{" "}
                    <i>
                      {format(res.startDate, "yyyy-MM-dd")} {res.startTime}
                    </i>
                  </p>
                  <p>
                    Дата і час завершення:{" "}
                    <i>
                      {format(res.endDate, "yyyy-MM-dd")} {res.endTime}
                    </i>
                  </p>
                  <p>
                    Статус: <i>{res.status}</i>
                  </p>
                </div>
                <div>
                  <img src={res.car.imageUrl} className="w-[200px]" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
