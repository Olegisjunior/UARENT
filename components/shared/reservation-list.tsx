"use client";
import React, { FC } from "react";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { Container } from "./container";

type Props = {
 reservations: any;
 sortedReservations: any[];
};

export const ReservationList: FC<Props> = ({
 reservations,
 sortedReservations,
}) => {
 const [isLoading, setIsLoading] = React.useState(true);

 React.useEffect(() => {
  if (sortedReservations) {
   setIsLoading(false);
  }
 }, [sortedReservations]);

 return (
  <Container>
   {isLoading ? (
    <>
     <div className="space-y-5 bg-white mt-5">
      <div className="flex justify-center items-center mt-5 p-10">
       <Skeleton className="h-6 w-1/4" />
      </div>

      {[...Array(5)].map((_, index) => (
       <div key={index} className="flex gap-5 justify-between items-center p-5">
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
        <div className="flex gap-5 justify-between items-center p-5">
         <p className="text-[#85A8F8] w-[250px] text-center">
          Дата створення замовлення: {format(res.createdAt, "yyyy-MM-dd")}
         </p>
         <hr className="transform: -rotate-90 w-[120px] h-[2px] bg-black opacity-20"></hr>
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
        </div>
       </div>
      ))}
    </div>
   )}
  </Container>
 );
};
