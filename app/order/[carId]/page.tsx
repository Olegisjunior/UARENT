"use server";
import { prisma } from "@/prisma/prisma-client";
import { OrderPageContainer } from "@/components/shared";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";

type Props = {
  params: Promise<{ carId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const carId = (await params).carId;
  const car = await prisma.car.findFirst({ where: { id: Number(carId) } });
  if (!car)
    return {
      title: "Машину не знайдено",
      description: "Машину не знайдено",
    };
  return {
    title: `Резервація ${car.name}`,
    description: `Резервація ${car.name}`,
  };
};

export default async function OrderPage({
  params,
}: {
  params: { carId: string };
}) {
  const { carId } = params;

  const session = await getServerSession(authOptions);

  const car = await prisma.car.findUnique({ where: { id: Number(carId) } });

  if (!car) {
    return <div>Машина не знайдена!</div>;
  }

  const reservation = await prisma.reservation.findMany({
    where: { carId: Number(carId) },
  });

  return (
    <OrderPageContainer reservation={reservation} car={car} session={session} />
  );
}
