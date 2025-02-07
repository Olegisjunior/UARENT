import { Container, ImageAndDetails, Reviews } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

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
