"use server";
import {
  CarsGroupContainer,
  Container,
  Filters,
  Sorts,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { format } from "date-fns";

export const metadata = async () => {
  return {
    title: "Машини",
  };
};

export default async function Cars(props: {
  searchParams: Record<string, string>;
}) {
  const params = await props.searchParams;

  const location = params.location || "";
  const pickUpDate = params.pick ? new Date(params.pick) : undefined;
  const dropOffDate = params.drop ? new Date(params.drop) : undefined;
  const pickUpTime = pickUpDate && format(pickUpDate, "HH:mm");

  const types = params.types ? params.types.split(",") : [];
  const brands = params.brands ? params.brands.split(",") : [];
  const capacitys = params.capacitys ? params.capacitys.split(",") : [];
  const priceRange = params.priceRange
    ? params.priceRange.split(",").map(Number)
    : [70, 300];
  const sortField = params.sortField || "price";
  const sortOrder = params.sortOrder === "desc" ? "desc" : "asc";

  const filterConditions: { [key: string]: any } = {
    ...(location && { location }),
    ...(types.length > 0 && {
      typeId: {
        in: types.map((type) =>
          getTypeId(type as "sport" | "sedan" | "suv" | "electric")
        ),
      },
    }),
    ...(brands.length > 0 && { brand: { in: brands } }),
    ...(capacitys.length > 0 && {
      seats: { in: capacitys.map((capacity) => Number(capacity)) },
    }),
    price: {
      gte: priceRange[0],
      lte: priceRange[1],
    },
  };

  const cars = await prisma.car.findMany({
    where: {
      ...filterConditions,

      reservations: {
        none: {
          OR: [
            {
              startDate: { lte: dropOffDate },
              endDate: { gte: pickUpDate },
            },
          ],
        },
      },
      GeneralAvailability: {
        some: {
          availableHours: {
            array_contains: pickUpTime,
          },
        },
      },
    },
    orderBy: {
      [sortField]: sortOrder,
    },
    include: {
      GeneralAvailability: true,
    },
  });

  return (
    <div className="mt-5">
      <Container className="flex flex-col xl:flex-row gap-5">
        <div className="w-full h-fit hidden xl:flex  xl:justify-start  xl:gap-0   xl:w-[300px] py-5 xl:bg-white">
          <Filters />
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-between mx-10 xl:mx-5 xl:justify-end items-center gap-10">
            <div className="xl:hidden flex">
              <Filters />
            </div>
            <Sorts />
          </div>
          <CarsGroupContainer cars={cars} cols={3} />
        </div>
      </Container>
    </div>
  );
}
function getTypeId(type: "sport" | "sedan" | "suv" | "electric") {
  const mapping = { sport: 1, sedan: 2, suv: 3, electric: 4 };
  return mapping[type];
}
