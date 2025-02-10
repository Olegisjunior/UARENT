"use client";
import { Button } from "@/components/ui/button";
import { removeCar, addCar } from "@/store/LikeSlice";
import { RootState } from "@/store/store";
import { CarIcon, FuelIcon, Heart, UsersRoundIcon } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  fuel: number;
  transmision: string;
  seats: number;
};

export const ProductCart: React.FC<Props> = ({
  id,
  name,
  description,
  imageUrl,
  price,
  fuel,
  transmision,
  seats,
}) => {
  const dispatch = useDispatch();
  const LikeDetails = useSelector((state: RootState) => state.like.cars);
  const notify = () => toast.success("Машина добавлена до улюблених!");
  const notifySecond = () => toast.success("Машина видаленна з улюблених!");

  const handleLike = (id: number) => {
    const car = { id, name, imageUrl };
    LikeDetails.some((car) => car.id === id) ? notifySecond() : notify();

    dispatch(
      LikeDetails.some((car) => car.id === id) ? removeCar(car.id) : addCar(car)
    );
  };

  return (
    <div className="item bg-white text-[#1A202C]  flex flex-col rounded-md  justify-between w-[305px] h-[390px]">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-start px-5 pt-5">
          <Link href={`/car/${id}`}>
            <p className=" text-xl font-bold truncate hover:underline">
              {name}
            </p>
            <p className="text-[#90A3BF] font-normal truncate w-[180px] hover:underline">
              {description}
            </p>
          </Link>
        </div>

        <div className="px-5 pt-5">
          <Button
            variant="link"
            size={"icon"}
            className=" "
            onClick={() => {
              handleLike(id);
            }}
          >
            <Heart
              color={
                LikeDetails.some((el) => el.id === id) ? `#c53a3a` : `#90A3BF`
              }
              fill={LikeDetails.some((el) => el.id === id) ? `#c53a3a` : `none`}
            />
          </Button>
        </div>
      </div>

      <Link href={`/car/${id}`}>
        <img src={imageUrl} className="w-full h-[220px]" alt="" />
      </Link>
      <div className="flex flex-col gap-6">
        <div className="icons flex justify-between items-center px-5 gap-2">
          <div className="flex justify-center items-center gap-2">
            <FuelIcon color="#90A3BF" size={20} />
            <p className="text-[#90A3BF]">
              {fuel}
              {name.includes("Tesla")
                ? "kWh"
                : name.includes("Taycan")
                ? "kWh"
                : "L"}
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <CarIcon color="#90A3BF" size={20} />
            <p className="text-[#90A3BF]">{transmision}</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <UsersRoundIcon color="#90A3BF" size={20} />
            <p className="text-[#90A3BF]">{seats}</p>
          </div>
        </div>
        <div className="flex justify-between items-center px-5 pb-5">
          <div className="flex justify-center items-center ">
            <p className="text-xl font-extrabold">${price}/</p>
            <span className="font-normal text-[#90A3BF]">день</span>
          </div>
          <Button>
            <Link href={`/order/${id}`}>Орендувати</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
