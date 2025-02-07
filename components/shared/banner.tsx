import Link from "next/link";
import { Button } from "../ui/button";

export const Banner = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center lg:flex-row gap-5">
        <div className="bg-[#629dfd] rounded-xl h-[300px] w-[350px] md:h-[300px] md:w-[540px] lg:h-[300px] lg:w-[590px] xl:w-[640px] flex justify-start items-start relative ">
          <div className="flex flex-col mt-5 ml-5 gap-4 z-50">
            <h1 className="text-white font-bold text-3xl">
              Найкраща платформа <br />
              для оренди Машин
            </h1>
            <p className="text-white">
              Легко, безпечно та надійно орендувати автомобіль. <br />
              Звичайно, за низькою ціною.
            </p>
            <Link href="/cars" className="w-[150px]">
              <Button className="w-[150px]">Rental car</Button>
            </Link>
          </div>

          <img
            src="/car.webp"
            className="z-10 absolute right-20 md:right-32 top-44 w-[250px] md:w-[400px]"
            alt=""
          />
        </div>
        <div className="bg-[#6271fd] rounded-xl h-[300px] w-[350px] md:h-[300px] md:w-[540px] lg:h-[300px] lg:w-[590px] xl:w-[640px] flex justify-start items-start relative ">
          <div className="flex flex-col mt-5 ml-5 gap-4 z-50">
            <h1 className="text-white font-bold text-3xl">
              Найкраща платформа <br />
              для оренди Машин
            </h1>
            <p className="text-white">
              Легко, безпечно та надійно орендувати автомобіль. <br /> Звичайно,
              за низькою ціною.
            </p>
            <Link href="/cars" className="w-[150px]">
              <Button className="w-[150px]">Rental car</Button>
            </Link>
          </div>

          <img
            src="/car.webp"
            className="z-10 absolute right-20 md:right-32 top-44 w-[250px] md:w-[400px]"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
