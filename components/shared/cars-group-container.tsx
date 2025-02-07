"use client";
import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { CarsGroup } from "./cars-group";
import { Car } from "@prisma/client";

type Props = {
  cars: Car[];
  cols: number;
};

export const CarsGroupContainer: FC<Props> = ({ cars, cols }) => {
  const isCarsLoading = cars === undefined;
  const isCarsEmpty = cars?.length === 0;

  return (
    <>
      {isCarsLoading ? (
        <div
          className="grid gap-[30px]"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="item flex flex-col rounded-md justify-between w-[300px] h-[390px]"
            />
          ))}
        </div>
      ) : isCarsEmpty ? (
        <div>
          <p>Не знайдено вільних машин!</p>
        </div>
      ) : (
        <div className="flex-1">
          <div className="flex flex-col items-center md:items-stretch">
            <CarsGroup
              key="cars-group"
              disableSkeleton={true}
              cols={3}
              cars={cars}
            />
          </div>
        </div>
      )}
    </>
  );
};
