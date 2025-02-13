"use client";
import React, { FC } from "react";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { Container } from "./container";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import { Car, Reservation } from "@prisma/client";

type Props = {
  reservations: (Reservation & { car: Car })[];
  sortedReservations: (Reservation & { car: Car })[];
};

export const ReservationList: FC<Props> = ({
  reservations,
  sortedReservations,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedReservation, setSelectedReservation] = React.useState<
    (Reservation & { car: Car }) | null
  >(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (sortedReservations) {
      setIsLoading(false);
    }
  }, [sortedReservations]);

  const handleCancel = async () => {
    if (!selectedReservation) return;

    try {
      const res = await fetch(`/api/reservation/${selectedReservation.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Помилка скасування замовлення");

      toast.success("Замовлення скасовано!");
      setIsModalOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося скасувати замовлення.");
    }
  };

  return (
    <Container>
      {isLoading ? (
        <>
          <div className="space-y-5 bg-white mt-5">
            <div className="flex justify-center items-center mt-5 p-10">
              <Skeleton className="h-6 w-1/4" />
            </div>

            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex gap-5 justify-between items-center p-5"
              >
                <Skeleton className="w-[250px] h-6" />
                <hr className="transform -rotate-90 w-[120px] h-[2px] bg-black opacity-20" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
                <Skeleton className="w-[200px] h-[120px]" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="container mx-auto my-5 bg-white rounded-xl p-5 min-h-[800px] h-fit">
          <h1 className="text-2xl font-bold flex justify-center items-center p-2">
            Деталі замовлень
          </h1>

          {reservations.length > 0 &&
            sortedReservations.map((res) => (
              <div key={res.id * 24.35}>
                {sortedReservations.indexOf(res) === 0 ? null : (
                  <hr className="w-full bg-black h-[2px] opacity-20" />
                )}
                <div className="flex gap-5 flex-col lg:flex-row  justify-center lg:justify-between items-center p-5">
                  <p className="text-[#85A8F8] w-[250px] text-center">
                    Дата створення замовлення:{" "}
                    {format(res.createdAt, "yyyy-MM-dd")}
                  </p>
                  <hr className="transform: -rotate-90 w-[120px] hidden lg:flex h-[2px] bg-black opacity-20"></hr>
                  <div className="flex-1 ">
                    <p>
                      Машина: <i>{res.car.name}</i>
                    </p>
                    <p>
                      Дата і час початку:{" "}
                      <i>
                        {format(res.startDate, "yyyy-MM-dd")} {res.startTime}
                      </i>
                    </p>
                    <p>
                      Дата і час завершення:{" "}
                      <i>
                        {format(res.endDate, "yyyy-MM-dd")} {res.endTime}
                      </i>
                    </p>
                    <p>
                      Статус: <i>{res.status}</i>
                    </p>
                  </div>
                  <div>
                    <img src={res.car.imageUrl} className="w-[200px]" />
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedReservation(res);
                      setIsModalOpen(true);
                    }}
                    className="bg-red-500 hover:bg-[#a31f1f] text-white"
                  >
                    Скасувати
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4">
              Підтвердження скасування
            </DialogTitle>
            <DialogDescription>
              <div className="p-5">
                <p>Ви впевнені, що хочете скасувати це замовлення?</p>
                <div className="flex justify-end mt-4 gap-3">
                  <Button onClick={() => setIsModalOpen(false)}>
                    Відмінити
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-[#a31f1f] text-white"
                  >
                    Скасувати замовлення
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
