"use server";
import { Container, ImageAndDetails, Reviews } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).id;
  const car = await prisma.car.findFirst({ where: { id: Number(id) } });
  if (!car)
    return {
      title: "Машину не знайдено",
      description: "Машину не знайдено",
    };
  return {
    title: `${car.name}`,
    description: `${car.name}`,
  };
};

export default async function Car(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const car = await prisma.car.findFirst({ where: { id: Number(id) } });
  if (!car) {
    notFound();
  }
  const comments = await prisma.comment.findMany({
    where: { carId: car.id },
    include: { user: true },
  });

  return (
    <Container className="max-w-[1350px]">
      <ImageAndDetails reviews={comments} car={car} />
      <Reviews fetchedComments={comments} car={car} />
    </Container>
  );
}
