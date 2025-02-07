"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { SortAscIcon, SortDescIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

export const Sorts: FC<Props> = ({}) => {
  const [typeSort, setTypeSort] = React.useState("asc");
  const router = useRouter();

  React.useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("sortOrder");

    currentParams.set("sortOrder", typeSort);

    router.push(`/cars?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  }, [typeSort]);

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
