"use client";
import React from "react";
import { Container } from "./container";
import { AuthModal } from "./modal";
import { OrderForm } from "./form";
import { Car } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FormPickOrDrop } from "./from-pick-or-drop";
import Link from "next/link";

type Props = {
  car: Car;
  reservation?:
    | {
        status: string;
        id: number;
        carId: number;
        startDate: Date;
        endDate: Date;
        startTime: string;
        endTime: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        customerId: string;
        cardNumber: string | null;
        expiryDate: string | null;
        cvv: string | null;
        paymentMethod: string;
        updatedAt: Date;
      }[]
    | undefined;
};

export function OrderPageContainer({ car, reservation }: Props) {
  const [reservDates, setReservDates] = React.useState({
    pickUpDate: new Date(),
    pickUpTime: "",
    dropOffDate: new Date(),
    dropOffTime: "",
  });
  const [isModal, setIsModal] = React.useState(true);

  const session = useSession();
  const user = session.data?.user;

  const handleSubmitFormPickOrDrop = (data: any) => {
    setReservDates(data);
  };

  const calculatedPrice = () => {
    const pickUpDateTime = new Date(`${reservDates.pickUpDate.toString()} ${reservDates.pickUpTime}`);
    const dropOffDateTime = new Date(`${reservDates.dropOffDate.toString()} ${reservDates.dropOffTime}`);
    const diffHours = Math.ceil((dropOffDateTime.getTime() - pickUpDateTime.getTime()) / (1000 * 3600));
    return {
      hours: diffHours,
      price: Math.round(diffHours * (car.price / 24)),
    };
  };

  return (
    <Container>
      {!user ? (
        <AuthModal open={isModal} onClose={() => setIsModal(false)} />
      ) : (
        <div className="flex justify-between items-center my-2 ">
          <div className="flex flex-col gap-y-2">
            <div className="bg-white p-3 rounded-lg">
              <FormPickOrDrop
                handleSubmitFormPickOrDrop={handleSubmitFormPickOrDrop}
                redirectData={false}
                reservation={reservation}
                isSubmitButton={false}
                className="flex flex-col justify-center items-center "
                className2="gap-10"
              />
            </div>
            <OrderForm user={user && user} carId={car.id} reservation={reservation} />
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col justify-around items-center w-[470px] h-[400px]">
            <h1 className="text-2xl font-bold">Підсумок оренди </h1>
            <p className="text-[#90A3BF] text-sm">Ціни можуть змінюватися залежно від тривалості оренди та ціни вашого орендованого автомобіля.</p>
            <div className="flex justify-start gap-3 items-center w-full">
              <Link href={`/car/${car.id}`} className="flex justify-center items-center w-[125px]">
                <img src={car.imageUrl} className="w-[125px]" />
              </Link>
              <Link href={`/car/${car.id}`}>
                <p className="font-bold text-2xl truncate w-[300px] hover:underline">{car.name}</p>
              </Link>
            </div>
            <hr className="bg-[#90A3BF] h-[1px] w-full opacity-50" />
            <div className="flex justify-between items-center w-full">
              <p className="text-[#90A3BF]">Ціна</p>
              <p className="">{car.price}$/день</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[#90A3BF]">К-сть годин</p>
              <p>{calculatedPrice().hours} год</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="font-semibold text-xl">Розрахована вартість оренди</p>
              <p className="font-semibold text-xl">{calculatedPrice().price}$</p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
