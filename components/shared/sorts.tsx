"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { SortAscIcon, SortDescIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Sorts: FC<{}> = () => {
  const [typeSort, setTypeSort] = React.useState("asc");
  const router = useRouter();

  React.useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("sortOrder");

    currentParams.set("sortOrder", typeSort);

    router.push(`/cars?${currentParams.toString()}`, {
      //@ts-ignore
      shallow: true,
    });
  }, [typeSort, router]);

  const handleClick = () => {
    setTypeSort((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };
  return (
    <div>
      <Button onClick={() => handleClick()}>
        {typeSort === "asc" ? <SortAscIcon /> : <SortDescIcon />}
      </Button>
    </div>
  );
};
