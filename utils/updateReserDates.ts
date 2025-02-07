import { prisma } from "@/prisma/prisma-client";

export async function UpdateDates() {
  try {
    const today = new Date();

    const expiredReservations = await prisma.reservation.findMany({
      where: {
        startDate: {
          lt: today,
        },
      },
    });

    if (expiredReservations.length === 0) {
      console.log("Немає бронювань для оновлення.");
      return [];
    }

    const updatedReservations = await Promise.all(
      expiredReservations.map((reservation) =>
        prisma.reservation.update({
          where: { id: reservation.id },
          data: {
            startDate: new Date(
              new Date(reservation.startDate).getTime() +
                10 * 24 * 60 * 60 * 1000
            ),
            endDate: new Date(
              new Date(reservation.endDate).getTime() + 10 * 24 * 60 * 60 * 1000
            ),
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        })
      )
    );

    console.log("Dates updated successfully!");
    return updatedReservations;
  } catch (error) {
    console.error("Error updating dates:", error);
    throw error;
  }
}
