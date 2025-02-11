import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.reservation.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Reservation canceled" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error canceling reservation:", error);
    return NextResponse.json(
      { error: "Error canceling reservation" },
      { status: 500 }
    );
  }
}
