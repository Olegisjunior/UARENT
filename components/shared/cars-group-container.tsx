"use client";
import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { CarsGroup } from "./cars-group";

type Props = {
  cars: any;
  cols: number;
};

export const CarsGroupContainer: FC<Props> = ({ cars, cols }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (cars.length > 0) {
      setIsLoading(false);
    }
  }, [cars]);

  return (
    <>
      {isLoading ? (
        <div className="grid gap-[30px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="item flex flex-col rounded-md  justify-between w-[300px] h-[390px]" />
          ))}
        </div>
      ) : (
        <div className="flex-1">
          <div className="flex flex-col ">
            <CarsGroup key={"asdasdasdasd"} disableSkeleton={true} cols={3} cars={cars} />
          </div>
        </div>
      )}
    </>
  );
};
