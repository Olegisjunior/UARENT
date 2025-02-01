import Link from "next/link";
import { Button } from "../ui/button";

export const Banner = () => {
  return (
    <>
      <div className="flex gap-5">
        <div className="bg-[#629dfd] rounded-xl h-[300px] w-[640px] flex justify-start items-start relative ">
          <div className="flex flex-col mt-5 ml-5 gap-4 z-50">
            <h1 className="text-white font-bold text-3xl">
              Найкраща платформа <br />
              для оренди Машин
            </h1>
            <p className="text-white">
              Easy of doing a car rental safely and reliably. <br />
              Of course at a low price.
            </p>
            <Link href="/cars">
              <Button className="w-[150px]">Rental car</Button>
            </Link>
          </div>

          <img src="/car.webp" className="z-10 absolute right-32 top-44 w-[400px]" alt="" />
        </div>
        <div className="bg-[#6271fd] rounded-xl h-[300px] w-[640px] flex justify-start items-start relative ">
          <div className="flex flex-col mt-5 ml-5 gap-4 z-50">
            <h1 className="text-white font-bold text-3xl">
              The Best Platform <br />
              for Car Rental
            </h1>
            <p className="text-white">
              Easy of doing a car rental safely and reliably. <br />
              Of course at a low price.
            </p>
            <Link href="/cars">
              <Button className="w-[150px]">Rental car</Button>
            </Link>
          </div>

          <img src="/car.webp" className="z-10 absolute right-32 top-44 w-[400px]" alt="" />
        </div>
      </div>
    </>
  );
};
