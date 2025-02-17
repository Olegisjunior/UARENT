"use client";
import React from "react";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ErrorMessage } from "@hookform/error-message";
import { StarRating } from "./star-rating";
import { Car, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { AuthModal } from "./modal";
import { toast } from "react-toastify";

type FormType = {
  comment: string;
  rating: number | null;
};

type Comment = {
  id: number;
  createdAt: Date;
  rating: number | null;
  content: string;
  carId: number;
  userId: number;
  user: User;
};

type Props = {
  car: Car;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CreateReview: React.FC<Props> = ({ car, setComments }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const [rating, setRating] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const session = useSession();
  const user = session.data?.user;
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors: err },
  } = useForm<FormType>({
    defaultValues: {
      comment: "",
      rating: null,
    },
  });

  const notify = () => toast.success("Відгук створено!");
  const notifySecond = () => toast.error("Сталась помилка!");

  const onSubmit = async (data: { comment: string; rating: number | null }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: data.comment,
          carId: car.id,
          userId: Number(user?.id),
          rating: rating,
        }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments((prevComments) => [newComment, ...prevComments]);
        reset();
        setRating(0);
        notify();
      } else {
        const error = await response.json();
        notifySecond();
        alert(`Failed: ${error.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      {!user && (
        <div className="text-[#596780] my-3">
          Для написання відгуків необхідно
          <Button
            variant={"link"}
            onClick={() => setOpenAuthModal(true)}
            className="text-primary  hover:underline p-2"
          >
            <i>авторизуватися.</i>
          </Button>
        </div>
      )}
      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div>
            <Input
              placeholder="Написати відгук"
              className="text-[#596780]"
              {...register("comment", {
                required: {
                  value: true,
                  message: "Це поле обов'язкове",
                },
                minLength: {
                  value: 10,
                  message: "Це поле має містити мінімум декілька слів",
                },
                pattern: {
                  value: /^[A-Za-z0-9\s!.,?А-Яа-яЁёІіїЇєщЩьЬ]+$/,
                  message:
                    "Це поле має містити тільки букви та цифри і деякі спеціальні символи",
                },
              })}
            />
            <ErrorMessage
              errors={err}
              name="comment"
              render={({ message }) => (
                <p className="text-red-500 text-[0.8rem]">{message}</p>
              )}
            />
          </div>
          <div className="">
            <Controller
              name="rating"
              control={control}
              rules={{ required: "Обов'язково треба вибрати рейтинг" }}
              render={({ field }) => (
                <StarRating
                  selectedStars={rating}
                  setSelectedStars={(stars) => {
                    setRating(stars);
                    field.onChange(stars);
                  }}
                  totalStars={5}
                />
              )}
            />
            <ErrorMessage
              errors={err}
              name="rating"
              render={({ message }) => (
                <p className="text-red-500 text-[0.8rem] ">{message}</p>
              )}
            />
          </div>

          <Button className={loading ? `disabled` : ``}>Відправити</Button>
        </form>
      )}
    </>
  );
};
