"use client";
import React, { useState } from "react";

type props = {
  totalStars?: number;
  selectedStars: number;
  setSelectedStars: React.Dispatch<React.SetStateAction<number>>;
};

export const StarRating: React.FC<props> = ({ totalStars = 5, selectedStars, setSelectedStars }) => {
  const [hoveredStars, setHoveredStars] = useState<number | null>(0);

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => {
        const starNumber = index + 1;

        return (
          <span
            key={starNumber}
            onMouseEnter={() => setHoveredStars(selectedStars ? null : starNumber)}
            onMouseLeave={() => setHoveredStars(selectedStars ? null : 0)}
            onClick={() => setSelectedStars(starNumber)}
            style={{
              cursor: "pointer",
              color: starNumber <= (hoveredStars || selectedStars) ? "gold" : "gray",
              fontSize: "25px",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
