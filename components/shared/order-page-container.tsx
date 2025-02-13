"use client";
import React from "react";
import { Container } from "./container";
import { AuthModal } from "./modal";
import { OrderForm } from "./form";
import { Car } from "@prisma/client";
import { FormPickOrDrop } from "./from-pick-or-drop";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
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

type handleSubmitFormPickOrDrop = (data: {
  pickUpDate: Date;
  pickUpTime: string;
  dropOffDate: Date;
  dropOffTime: string;
}) => void;

export function OrderPageContainer({ car, reservation, session }: Props) {
  const [reservDates, setReservDates] = React.useState({
    pickUpDate: new Date(),
    pickUpTime: "",
    dropOffDate: new Date(),
    dropOffTime: "",
  });
  const [isModal, setIsModal] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (car) {
      setIsLoading(false);
    }
  }, [car]);

  React.useEffect(() => {
    if (!session || !session.user) {
      setIsModal(true);
    } else {
      setIsModal(false);
    }
  }, [session]);

  const handleSubmitFormPickOrDrop: handleSubmitFormPickOrDrop = (data) => {
    setReservDates(data);
  };

  const calculatedPrice = () => {
    const pickUpDateTime = new Date(
      `${reservDates.pickUpDate.toString()} ${reservDates.pickUpTime}`
    );
    const dropOffDateTime = new Date(
      `${reservDates.dropOffDate.toString()} ${reservDates.dropOffTime}`
    );
    const diffHours = Math.ceil(
      (dropOffDateTime.getTime() - pickUpDateTime.getTime()) / (1000 * 3600)
    );
    return {
      hours: diffHours,
      price: Math.round(diffHours * (car.price / 24)),
    };
  };

  return (
    <Container className="mt-5">
      {isModal && (
        <div>
          <AuthModal open={isModal} onClose={() => setIsModal(false)} />
          <div className="h-[800px] flex justify-center items-center flex-col gap-10"></div>
        </div>
      )}

      <div className="flex flex-col xl:flex-row justify-between items-start gap-5 xl:gap-0 my-2 ">
        <div className=" flex-col gap-y-2 flex justify-center items-center">
          <div className="bg-white p-3 rounded-lg w-[300px] md:w-full">
            <FormPickOrDrop
              handleSubmitFormPickOrDrop={handleSubmitFormPickOrDrop}
              redirectData={false}
              reservation={reservation}
              isSubmitButton={false}
              className2="gap-3 flex-col md:flex-row"
              className="flex gap-2 justify-center items-center flex-col  "
            />
          </div>
          <div className="xl:hidden flex bg-white p-4 rounded-lg  flex-col justify-around items-center w-[300px] md:w-[400px] lg:w-[470px] h-[400px]">
            <h1 className="text-lg xl:text-2xl font-bold">Підсумок оренди</h1>
            <p className="text-[#90A3BF] text-sm">
              Ціни можуть змінюватися залежно від тривалості оренди та ціни
              вашого орендованого автомобіля.
            </p>
            <div className="flex flex-col xl:flex-row xl:justify-start gap-3 items-center w-full">
              <Link
                href={`/car/${car.id}`}
                className="flex justify-center items-center w-full xl:w-[125px]"
              >
                <img src={car.imageUrl} className="w-[125px]" />
              </Link>
              <Link href={`/car/${car.id}`}>
                <p className="font-bold text-lg xl:text-2xl truncate w-full xl:w-[300px] hover:underline">
                  {car.name}
                </p>
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
              <p className="font-semibold text-lg xl:text-xl">
                Розрахована вартість оренди
              </p>
              <p className="font-semibold text-lg xl:text-xl">
                {calculatedPrice().price}$
              </p>
            </div>
          </div>
          <OrderForm
            session={session && session}
            carId={car.id}
            reservation={reservation}
          />
        </div>
        {isLoading ? (
          <div className="animate-pulse bg-white w-[470px] h-[400px] justify-center items-center flex rounded-lg">
            <Skeleton className="animate-pulse w-[400px] h-[340px]" />
          </div>
        ) : (
          <div className="hidden xl:flex bg-white p-4 rounded-lg  flex-col justify-around items-center w-[300px] md:w-[470px] h-[400px]">
            <h1 className="text-2xl font-bold">Підсумок оренди </h1>
            <p className="text-[#90A3BF] text-sm">
              Ціни можуть змінюватися залежно від тривалості оренди та ціни
              вашого орендованого автомобіля.
            </p>
            <div className="flex justify-start gap-3 items-center w-full">
              <Link
                href={`/car/${car.id}`}
                className="flex justify-center items-center w-[125px]"
              >
                <img src={car.imageUrl} className="w-[125px]" />
              </Link>
              <Link href={`/car/${car.id}`}>
                <p className="font-bold text-2xl truncate w-[300px] hover:underline">
                  {car.name}
                </p>
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
              <p className="font-semibold text-xl">
                Розрахована вартість оренди
              </p>
              <p className="font-semibold text-xl">
                {calculatedPrice().price}$
              </p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
