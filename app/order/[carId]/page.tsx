import { prisma } from "@/prisma/prisma-client";
import { OrderPageContainer } from "@/components/shared";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

 
export default async function OrderPage({ params }: { params: { carId: string } }) {
  const { carId } = params;

  const session = await getServerSession(authOptions);


  
  const car = await prisma.car.findUnique({ where: { id: Number(carId) } });

  if (!car) {
    return <div>Машина не знайдена!</div>;
  }

  const reservation = await prisma.reservation.findMany({
    where: { carId: Number(carId) },
  });

  if (!reservation) {
    return null;
  }

  return <OrderPageContainer reservation={reservation} car={car} session={session} />;
}
