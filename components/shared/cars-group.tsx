"use client";
import { Skeleton } from "../ui/skeleton";
import { ProductCart } from "./product-cart";
import React from "react";

type Props = {
  title?: string;
  cars: any[] | null;
  cols?: number;
  disableSkeleton?: boolean;
};

export const CarsGroup: React.FC<Props> = ({ title, cars = [], cols = 0, disableSkeleton }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (cars && cars.length > 0) {
      setIsLoading(false);
    }
  }, [cars]);

  return (
    <>
      {isLoading ? (
        <>
          {isLoading && !disableSkeleton && <Skeleton className="h-6 w-[120px] mb-5" />}
          <div className="grid gap-[30px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: cols }).map((_, i) => (
              <Skeleton key={i} className="item flex flex-col rounded-md  justify-between w-[300px] h-[390px]" />
            ))}
          </div>
        </>
      ) : (
        <div className="h-fit">
          {title ? <h1 className="font-extrabold text-xl mb-5">{title.slice(0, 1).toUpperCase() + title.slice(1, 10)}</h1> : null}

          <div className={"grid  gap-[30px]"} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {cars?.map((car) => (
              <ProductCart
                key={car.id}
                id={car.id}
                name={car.name}
                description={car.description}
                imageUrl={car.imageUrl}
                price={car.price}
                fuel={car.fuel}
                transmision={car.transmision}
                seats={car.seats}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// <Suspense
// fallback={cars.map((car) => (
//   <Skeleton className="grid  gap-[30px] repeat(4, 1fr)" />
// ))}
// >
// <div className="h-fit">
//   {title ? <h1 className="font-extrabold text-lg mb-5">{title.slice(0, 1).toUpperCase() + title.slice(1, 10)}</h1> : null}

//   <div className={"grid  gap-[30px]"} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
//     {cars.map((car) => (
//       <ProductCart
//         key={car.id}
//         id={car.id}
//         name={car.name}
//         description={car.description}
//         imageUrl={car.imageUrl}
//         price={car.price}
//         fuel={car.fuel}
//         transmision={car.transmision}
//         seats={car.seats}
//       />
//     ))}
//   </div>
// </div>
// </Suspense>
