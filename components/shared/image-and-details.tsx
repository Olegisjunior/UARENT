"use client";
import React from "react";
import { ImageThumbnail } from "@/components/shared";
import { Heart } from "lucide-react";
import { Car, User, UserRole } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeCar, addCar } from "@/store/LikeSlice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

type Types = {
  car: Car;
  reviews: {
    id: number;
    createdAt: Date;
    rating: number | null;
    content: string;
    carId: number;
    userId: number;
    user: {
      name: string;
      id: number;
      createdAt: Date;
      updatedAt: Date;
      role: UserRole;
      email: string;
      password: string;
      provider: string | null;
      providerId: string | null;
    };
  }[];
};

interface Review {
  id: number;
  carId: number;
  content: string;
  createdAt: Date;
  rating: number | null;
  user: User;
  userId: number;
}

export const ImageAndDetails: React.FC<Types> = ({ car, reviews }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const LikeDetails = useSelector((state: RootState) => state.like.cars);

  const notify = () => toast.success("Машина добавлена до улюблених!");
  const notifySecond = () => toast.success("Машина видаленна з улюблених!");

  const handleLike = (id: number) => {
    const carDetails = { id, name: car.name, imageUrl: car.imageUrl };

    if (LikeDetails.some((car) => car.id === id)) {
      notifySecond();
    } else {
      notify();
    }
    dispatch(
      LikeDetails.some((carDeta) => carDeta.id === id)
        ? removeCar(carDetails.id)
        : addCar(carDetails)
    );
  };

  let ratingReview = 0;
  const averageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return;
    const totalRating = reviews.reduce(
      (acc: number, review: Review) => acc + (review.rating ?? 0),
      0
    );
    const average = Math.round(totalRating / reviews.length);
    ratingReview = average;
  };
  averageRating(reviews);

  const handleSubmit = () => {
    router.push(`/order/${car.id}`);
  };

  return (
    <div className="flex justify-center items-center flex-col  lg:justify-between lg:flex-row lg:items-stretch my-4 ">
      <div className="bg-white w-[350px] md:w-[500px] lg:w-[700px] py-14 rounded-xl my-10 lg:my-0">
        <ImageThumbnail product={car} key={car.id} />
      </div>
      <div className="bg-white w-[350px] md:w-[500px] lg:w-[600px] lg:h-[600px] rounded-xl px-6 flex flex-col justify-between">
        <div className="flex justify-between mb-3 my-6">
          <div className="">
            <div className="font-extrabold text-2xl lg:text-4xl text-[#1A202C]">
              {car.name}
            </div>
            <div>
              <div className="flex items-center gap-x-2 my-2">
                <div className="flex">
                  {[...Array(ratingReview)].map((_, index) => (
                    <span key={index} className="text-yellow-500 text-lg">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - ratingReview)].map((_, index) => (
                    <span key={index} className="text-[#90A3BF] text-lg">
                      ★
                    </span>
                  ))}
                </div>

                <p>{reviews.length}</p>
              </div>
            </div>
          </div>
          <div>
            <Button
              variant="link"
              size={"icon"}
              className=" "
              onClick={() => handleLike(car.id)}
            >
              <Heart
                color={
                  LikeDetails.some((el) => el.id === car.id)
                    ? `#c53a3a`
                    : `#90A3BF`
                }
                fill={
                  LikeDetails.some((el) => el.id === car.id)
                    ? `#c53a3a`
                    : `none`
                }
              />
            </Button>
          </div>
        </div>

        <div className="text-[#596780] text-xl lg:text-2xl h-[160px] flex justify-center items-center text-center">
          {car.description}
        </div>

        <div className="flex justify-between text-[#596780]  border-gray-300 py-4 gap-x-20 text-md lg:text-xl h-[120px] items-center">
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">Тип машини</span>
              <span className="font-semibold">
                {car.typeId === 1
                  ? "Sport"
                  : car.typeId === 2
                  ? "Sedan"
                  : car.typeId === 3
                  ? "SUV"
                  : "Electric"}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">Трансмісія</span>
              <span className="font-semibold">{car.transmision}</span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">Місткість</span>
              <span className="font-semibold">{car.seats} сидінь</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">
                {car.name.toLowerCase().includes("tesla") ||
                car.name.toLowerCase().includes("taycan")
                  ? "Батерея"
                  : "Пальне"}
              </span>
              <span className="font-semibold">
                {car.fuel}
                {car.name.toLowerCase().includes("tesla") ||
                car.name.toLowerCase().includes("taycan")
                  ? "kWh"
                  : "L"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex">
            <p className=" font-extrabold text-xl lg:text-3xl text-[#1A202C]">
              ${car.price}/
            </p>
            <span className="font-normal text-[#90A3BF] text-lg lg:text-2xl ">
              день
            </span>
          </div>
          <Button onClick={handleSubmit}>Орендувати</Button>
        </div>
      </div>
    </div>
  );
};
