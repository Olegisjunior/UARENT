"use client";
import React from "react";
import { ImageThumbnail } from "@/components/shared";
import { Heart } from "lucide-react";
import { Car } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeCar, addCar } from "@/store/LikeSlice";
import { RootState } from "@/store/store";
import { id } from "date-fns/locale";

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
      role: any;
      email: string;
      password: string;
      provider: string | null;
      providerId: string | null;
    };
  }[];
};

export const ImageAndDetails: React.FC<Types> = ({ car, reviews }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const LikeDetails = useSelector((state: RootState) => state.like.cars);

  const handleLike = (id: number) => {
    const carDetails = { id, name: car.name, imageUrl: car.imageUrl };
    dispatch(LikeDetails.some((carDeta) => carDeta.id === id) ? removeCar(carDetails.id) : addCar(carDetails));
  };

  let ratingReview = 0;
  const averageRating = (reviews: any) => {
    if (reviews.length === 0) return;
    const totalRating = reviews.reduce((acc: any, review: any) => acc + review.rating, 0);
    const average = Math.round(totalRating / reviews.length);
    ratingReview = average;
  };
  averageRating(reviews);

  const handleSubmit = () => {
    router.push(`/order/${car.id}`);
  };

  return (
    <div className="flex justify-between items-stretch my-4 ">
      <div className="bg-white w-[700px] py-14 rounded-xl">
        <ImageThumbnail product={car} key={car.id} />
      </div>
      <div className="bg-white w-[600px] h-[600px] rounded-xl px-6 flex flex-col justify-between">
        <div className="flex justify-between mb-3 my-6">
          <div className="">
            <div className="font-extrabold text-4xl text-[#1A202C]">{car.name}</div>
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
            <Button variant="link" size={"icon"} className=" " onClick={() => handleLike(car.id)}>
              <Heart color={LikeDetails.some((el) => el.id === car.id) ? `#c53a3a` : `#90A3BF`} fill={LikeDetails.some((el) => el.id === car.id) ? `#c53a3a` : `none`} />
            </Button>
          </div>
        </div>

        <div className="text-[#596780] text-2xl h-[160px] flex justify-center items-center text-center">{car.description}</div>

        <div className="flex justify-between text-[#596780]  border-gray-300 py-4 gap-x-20 text-xl h-[120px] items-center">
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">Type Car</span>
              <span className="font-semibold">{car.typeId === 1 ? "Sport" : car.typeId === 2 ? "Sedan" : car.typeId === 3 ? "SUV" : "Electric"}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">Transmision</span>
              <span className="font-semibold">{car.transmision}</span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">Capacity</span>
              <span className="font-semibold">{car.seats} seats</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#90A3BF]">{car.name.toLowerCase().includes("tesla") || car.name.toLowerCase().includes("taycan") ? "Battery" : "Fuel"}</span>
              <span className="font-semibold">
                {car.fuel}
                {car.name.toLowerCase().includes("tesla") || car.name.toLowerCase().includes("taycan") ? "kWh" : "L"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex">
            <p className=" font-extrabold text-3xl text-[#1A202C]">${car.price}/</p>
            <span className="font-normal text-[#90A3BF] text-2xl "> day</span>
          </div>
          <Button onClick={handleSubmit}>rental</Button>
        </div>
      </div>
    </div>
  );
};
