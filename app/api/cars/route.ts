import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const q = searchParams.get("q");

  const cars = await prisma.car.findMany({
    where: {
      AND: [type ? { typeId: Number(type) } : {}, q ? { name: { contains: q, mode: "insensitive" } } : {}],
    },
  });

  return NextResponse.json(cars);
}
