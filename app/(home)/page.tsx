import { Banner, CarsGroup, Container, FormPickOrDrop } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { UpdateDates } from "@/utils/updateReserDates";
import React from "react";

export default async function Home() {
  const categories = await prisma.type.findMany({ include: { cars: true } });

  UpdateDates();

  return (
    <>
      <Container className="my-5 flex flex-col gap-4">
        <Banner />
        <FormPickOrDrop className2="gap-3" redirectData={true} isSubmitButton={true} className="my-4 h-[150px] flex gap-2  justify-center  items-center" />
      </Container>

      <div className="flex">
        <Container className="flex-1">
          <div className="flex flex-col gap-10">{categories.map((category) => category.cars.length > 0 && <CarsGroup cols={4} key={category.id} title={category.name} cars={category.cars} />)}</div>
        </Container>
      </div>
    </>
  );
}

// не очищаються дані після створення замовлення, form and pick  yes

// not found pages, 404 custom! YES

// Like rtk - localstorage YES

// loading
// skeletons {

// order
// reservations

// }

//
//
//
// резиновий design (mobile), md: ,lg: ..

// перекласти весь сайт на укр

// Переглянути всі лоадери Авторизації (воно не має перше показувати що я не авторизований а аж потім показувати що все так ия авторизований.. ) перевірку треба змінити

// toatify all alerts..

// nextauth problem signin перекидує на якесь хуєву авторизацію

// post github
// post vercel

// refactoring all
