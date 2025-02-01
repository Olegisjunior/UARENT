"use client";
import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  reservations: any;
};

export const ReservSkeleton: FC<Props> = ({ reservations }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (reservations) {
      setIsLoading(false);
    }
  }, [reservations]);

  return (
    <div>
      {isLoading &&
        [1, 2, 3].map((item) => (
          <div key={item}>
            {item !== 1 && <hr className="w-full bg-black h-[2px] opacity-20" />}
            <div className="flex gap-5 justify-between items-center p-5">
              <Skeleton className="h-[200px] w-full " />
            </div>
          </div>
        ))}
    </div>
  );
};
