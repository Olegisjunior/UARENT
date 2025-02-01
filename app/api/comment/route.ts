import { prisma } from "@/prisma/prisma-client";

export async function POST(req: Request) {
  try {
    const { carId, userId, content, rating } = await req.json();

    if (!carId || !userId || !content || !rating) {
      return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        carId,
        userId,
        content,
        rating,
      },
    });

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500 });
  }
}
