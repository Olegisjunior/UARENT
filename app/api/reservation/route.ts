import { prisma } from "@/prisma/prisma-client";
import { format } from "date-fns";
import { NextResponse } from "next/server";

// const encryptId = (id: string) => {
//   const salt = bcrypt.genSaltSync(10);
//   const crypted = bcrypt.hashSync(id, salt);
//   return crypted;
// };

export async function POST(req: Request) {
  try {
    const {
      carId,
      startDate,
      endDate,
      startTime,
      endTime,
      firstName,
      lastName,
      email,
      phone,
      customerId,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
    } = await req.json();

    if (
      !carId ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      return NextResponse.json(
        { error: "Incomplete card details for card payment" },
        { status: 400 }
      );
    }

    console.log("Reservation Request Data:", {
      carId,
      startDate,
      endDate,
      startTime,
      endTime,
      firstName,
      lastName,
      email,
      phone,
      customerId,
      paymentMethod,
    });

    const reservation = await prisma.reservation.create({
      data: {
        carId,
        startDate: new Date(format(new Date(startDate), "yyyy-MM-dd")),
        endDate: new Date(format(new Date(endDate), "yyyy-MM-dd")),
        startTime,
        endTime,
        firstName,
        lastName,
        email,
        phone,
        customerId,
        paymentMethod,
        ...(paymentMethod === "card"
          ? {
              cardNumber,
              expiryDate,
              cvv,
            }
          : {}),
        status: "pending", // confirmed
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
