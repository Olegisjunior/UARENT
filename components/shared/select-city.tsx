"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";

interface SelectCityProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const SelectCity = React.forwardRef<HTMLDivElement, SelectCityProps>(
  ({ value, onChange }, ref) => {
    const locations = [
      "Паркінг - вулиця Торф'яна, 19, Шевченківський район",
      "Паркінг - вулиця Володимира Короленка, 9, Личаківський район",
      "Паркінг - ВАМ, проспект Червоної Калини, Сихівський район",
      "Паркінг - Горіховий гай, Франківський район",
      `ТРЦ "Скриня", вулиця Городоцька, Залізничний район`,
      'Підземний паркінг - ТРЦ "Форум", Галицький район',
    ];

    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[170px] text-[#64748b]">
          <SelectValue placeholder="Виберіть локацію" />
        </SelectTrigger>
        <SelectContent ref={ref}>
          {locations.sort().map((location) => (
            <SelectItem
              key={location}
              value={location}
              className="hover:cursor-pointer"
            >
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

SelectCity.displayName = "SelectCity";
