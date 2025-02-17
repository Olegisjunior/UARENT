"use client";
import React from "react";
import {
  HeartIcon,
  LogOutIcon,
  MenuIcon,
  NotebookTextIcon,
  User2Icon,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

import { AuthModal } from "./modal";
import { SearchInput } from "./search-input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeCar } from "@/store/LikeSlice";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const HeaderGuts: React.FC<Props> = ({ session }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [openLikeModal, setOpenLikeModal] = React.useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false);
  const LikedCars = useSelector((state: RootState) => state.like.cars);
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-[100%] md:w-[80%] mx-auto flex justify-between items-between my-5 relative">
        <div className="">
          <Link href={"/"}>
            <h1 className="text-[20px] md:text-[30px] font-[900] ">UARENT</h1>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <SearchInput />
        </div>
        <div className=" gap-2 md:gap-5 hidden lg:flex">
          <Button
            className="rounded-full h-[35px] w-[35px]"
            onClick={() => setOpenLikeModal(true)}
          >
            <HeartIcon fill="white" />
          </Button>

          {!session ? null : (
            <Link className="rounded-full h-[35px] w-[35px]" href="/profile">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  className="rounded-full h-[35px] w-[35px] border-[2px] border-primary"
                  alt="User Avatar"
                />
              ) : (
                <div className="flex justify-center items-center rounded-full h-[35px] w-[35px] bg-primary">
                  <User2Icon stroke="white" size={18} strokeWidth={2.5} />
                </div>
              )}
            </Link>
          )}

          {!session && (
            <Button
              onClick={() => setOpenAuthModal(true)}
              className="rounded-full h-[35px] w-[35px]"
            >
              <LogOutIcon className="scale-x-[-1]" />
            </Button>
          )}
          {session && (
            <Button className="rounded-full h-[35px] w-[35px]">
              <Link href={"/reservation"}>
                <NotebookTextIcon />
              </Link>
            </Button>
          )}
          <Sheet
            open={openLikeModal}
            onOpenChange={() => setOpenLikeModal(false)}
          >
            <SheetContent
              className={
                LikedCars.length >= 7
                  ? `overflow-y-scroll overflow-x-hidden custom-scroll`
                  : `overflow-y-hidden overflow-x-hidden `
              }
            >
              <SheetHeader>
                <SheetTitle>Вподобані машини</SheetTitle>
              </SheetHeader>
              <SheetDescription>
                Виберіть машину, яку ви хочете орендувати.
              </SheetDescription>

              {LikedCars.map((car) => (
                <div
                  key={car.id}
                  className="flex justify-between items-center gap-5 p-4 border-b border-gray-200 "
                >
                  <Link
                    href={`/car/${car.id}`}
                    key={car.id}
                    onClick={() => setOpenLikeModal(false)}
                    className="hover:bg-slate-100 rounded-lg p-2 w-full"
                  >
                    <div className="flex flex-col justify-center items-center    ">
                      <div className="flex flex-col gap-2 flex-1">
                        <p className="text-lg font-semibold w-full  hover:underline ">
                          {car.name}
                        </p>
                      </div>

                      <img
                        src={car.imageUrl}
                        className="w-[150px] h-[120px]  rounded-md"
                      />
                    </div>
                  </Link>
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="h-[30px] text-[#000000]"
                    onClick={() => dispatch(removeCar(car.id))}
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
            </SheetContent>
          </Sheet>
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
        </div>

        <Button
          onClick={() => {
            setOpenBurgerMenu(!openBurgerMenu);
          }}
          className=" w-[30px] h-[30px] rounded-full flex justify-center items-center lg:hidden"
        >
          <MenuIcon />
        </Button>

        <Sheet
          open={openBurgerMenu}
          onOpenChange={() => {
            setOpenLikeModal(false);
            setOpenBurgerMenu(false);
          }}
        >
          <SheetContent className="flex flex-col gap-2">
            <SheetHeader>
              <SheetTitle>
                <h1 className="text-2xl">Меню</h1>
              </SheetTitle>
            </SheetHeader>
            <Button
              variant={"link"}
              className="hover:underline w-full"
              onClick={() => {
                setOpenLikeModal(true);
                setOpenBurgerMenu(false);
              }}
            >
              <p className="text-primary text-[18px] font-normal">Liked</p>
            </Button>
            <hr className="w-full bg-primary h-[1px] opacity-40" />

            {!session ? null : (
              <Button
                variant={"link"}
                className="hover:underline w-full"
                onClick={() => {
                  setOpenBurgerMenu(false);
                }}
              >
                <Link
                  href={"/profile"}
                  className="hover:underline  items-center text-primary text-[18px] font-normal "
                >
                  {session && session.user?.image ? (
                    <p className="text-primary w-full">Profile</p>
                  ) : (
                    <p className="text-primary w-full">Profile</p>
                  )}
                </Link>
              </Button>
            )}
            {!session ? null : (
              <hr className="w-full bg-primary h-[1px] opacity-40" />
            )}

            {!session && (
              <Button
                onClick={() => {
                  setOpenAuthModal(true);
                  setOpenBurgerMenu(false);
                }}
                className="hover:underline"
                variant={"link"}
              >
                <p className="text-primary text-[18px] font-normal">SignIn</p>
              </Button>
            )}
            {!session && (
              <hr className="w-full bg-primary h-[1px] opacity-40" />
            )}
            {session && (
              <Link
                href={"/reservation"}
                className="w-full hover:underline flex justify-center items-center"
                onClick={() => setOpenBurgerMenu(false)}
              >
                <p className="text-primary text-[18px] font-normal w-full flex justify-center items-center">
                  Reservations
                </p>
              </Link>
            )}
            <Sheet
              open={openLikeModal}
              onOpenChange={() => {
                setOpenBurgerMenu(false);
              }}
            >
              <SheetContent
                className={
                  LikedCars.length >= 7
                    ? `overflow-y-scroll overflow-x-hidden custom-scroll`
                    : `overflow-y-hidden overflow-x-hidden `
                }
              >
                <SheetHeader>
                  <SheetTitle>Вподобані машини</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                  Виберіть машину, яку ви хочете орендувати.
                </SheetDescription>

                {LikedCars.map((car) => (
                  <div
                    key={car.id}
                    className="flex justify-between items-center gap-5 p-4 border-b border-gray-200 "
                  >
                    <Link
                      href={`/car/${car.id}`}
                      key={car.id}
                      onClick={() => setOpenLikeModal(false)}
                      className="hover:bg-slate-100 rounded-lg p-2 w-full"
                    >
                      <div className="flex flex-col justify-center items-center    ">
                        <div className="flex flex-col gap-2 flex-1">
                          <p className="text-lg font-semibold w-full  hover:underline ">
                            {car.name}
                          </p>
                        </div>

                        <img
                          src={car.imageUrl}
                          className="w-[150px] h-[120px]  rounded-md"
                        />
                      </div>
                    </Link>
                    <Button
                      variant={"link"}
                      size={"sm"}
                      className="h-[30px] text-[#000000]"
                      onClick={() => dispatch(removeCar(car.id))}
                    >
                      <XIcon />
                    </Button>
                  </div>
                ))}
              </SheetContent>
            </Sheet>
          </SheetContent>
        </Sheet>
      </div>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  );
};
