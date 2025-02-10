"use client";

import { Car } from "@prisma/client";
import React from "react";
import { CreateReview } from "./create-review";
import { User2Icon } from "lucide-react";

type TypesProps = {
  car: Car;
  fetchedComments: {
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

export const Reviews: React.FC<TypesProps> = ({ car, fetchedComments }) => {
  const [comments, setComments] = React.useState<any[]>(fetchedComments || []);

  return (
    <div className="bg-white rounded-xl w-full h-fit p-4 my-2 ">
      <h1 className="font-bold text-2xl text-[#1A202C] flex gap-4">
        Коментарі{" "}
        <span className="px-4  bg-[rgb(37,100,235)] text-white rounded-lg">
          {comments && comments.length}
        </span>
      </h1>

      <CreateReview comments={comments} setComments={setComments} car={car} />

      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment: any) => {
          const createdAt = new Date(comment.createdAt);
          return (
            <div key={comment.id}>
              <hr className="bg-[#90A3BF] w-full h-[2px] opacity-10" />
              <div className="flex flex-col items-start p-x-2 bg-white rounded-lg  space-y-4 mt-3 w-full">
                <div className="flex gap-x-4 w-full items-center">
                  <div className="w-16 h-16 rounded-full bg-[#C3D4E9] flex items-center justify-center">
                    <User2Icon size={44} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="text-xl  text-[#1A202C] font-bold">
                          {comment.user?.name}
                        </h3>
                      </div>
                      <div>
                        <span className="text-lg text-[#90A3BF]">
                          {createdAt.toDateString()}
                        </span>
                        <div className="flex items-center">
                          {[...Array(comment.rating)].map((_, index) => (
                            <span
                              key={index}
                              className="text-yellow-500 text-lg"
                            >
                              ★
                            </span>
                          ))}
                          {[...Array(5 - comment.rating)].map((_, index) => (
                            <span key={index} className="text-gray-300 text-lg">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-[#596780] w-full text-md my-2">
                      {comment.content && comment.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-[#596780]">Ще немає відгуків.</div>
      )}
    </div>
  );
};
