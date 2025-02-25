import {
  Banner,
  CarsGroup,
  Container,
  FormPickOrDrop,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { UpdateDates } from "@/utils/updateReserDates";
import React from "react";

export const metadata = async () => {
  return {
    title: "Головна",
  };
};

export default async function Home() {
  const categories = await prisma.type.findMany({ include: { cars: true } });

  UpdateDates();

  return (
    <>
      <Container className="my-5 flex flex-col justify-center items-center gap-4">
        <Banner />

        <FormPickOrDrop
          defaultCellInCalendar={true}
          className2="gap-3 flex-col md:flex-row"
          redirectData={true}
          isSubmitButton={true}
          className="flex gap-2  justify-center  items-center flex-col my-18 xl:flex-row w-[200px] lg:my-4"
        />
      </Container>

      <div className="flex">
        <Container className="flex-1 ">
          <div className="flex flex-col items-center md:items-stretch  gap-10">
            {categories.map(
              (category) =>
                category.cars.length > 0 && (
                  <CarsGroup
                    key={category.id}
                    title={category.name}
                    cars={category.cars}
                  />
                )
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

// не очищаються дані після створення замовлення, form and pick  yes
// not found pages, 404 custom! YES
// Like rtk - localstorage YES
// loading YES
// skeletons YES
// sort cars YES
// резиновий design (mobile), md: , lg: ..
// - HomePage YES
// - Car YES
// - Cars YES
// - Order YES
// - Reservations YES
// - Profile YES
// formpickordrop homepage dosen't work YES
// toatify all alerts.. yes
// перекласти весь сайт на укр YES
// metadata's YES
// Переглянути всі лоадери Авторизації (воно не має перше показувати що я не авторизований а аж потім показувати що все так ия авторизований.. ) перевірку треба змінити YES
// скасувати оренду (видалити резервацію на сторінці резервацій) YES

// post github YES
// post vercel YES
// Comments creating with another client than who comment! Problem! YES
// fix auth YES
// Form pick or drop in order не показується дізейбл на днях до першої дати (local all working)
// Profile if u google or github, u can't change password or email YES
// Icon always reload YES
// order page when i am not authorized YES
// mobile design on order page (non-centered) YES
// mobile design Auth Modal'a YES

// refactoring all, to arhitecture papok

// better github profile
