import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const q = searchParams.get("q");
  const sortField = searchParams.get("sortField") || "price";
  const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

  const cars = await prisma.car.findMany({
    where: {
      AND: [
        type ? { typeId: Number(type) } : {},
        q ? { name: { contains: q, mode: "insensitive" } } : {},
      ],
    },
    orderBy: {
      [sortField]: sortOrder,
    },
  });

  return NextResponse.json(cars);
}
