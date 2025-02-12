"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { startOfDay } from "date-fns";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  pickUpDate?: Date;
  dropOffDate?: Date;
  pickUpTime?: string;
}

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value, onChange, pickUpDate, pickUpTime, dropOffDate }, ref) => {
    const [availableTimes, setAvailableTimes] = React.useState<string[]>([]);
    const times = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];

    const getAvailableTimes = (
      times: string[],
      pickUpTime?: string
    ): string[] => {
      if (!pickUpDate || !pickUpTime || !dropOffDate) return times;

      if (
        pickUpDate &&
        dropOffDate &&
        startOfDay(pickUpDate).getTime() === startOfDay(dropOffDate).getTime()
      ) {
        return times.filter((time) => {
          const timeHour = parseInt(time.split(":")[0]);
          const pickUpHour = pickUpTime
            ? parseInt(pickUpTime.split(":")[0])
            : 0;

          return timeHour > pickUpHour;
        });
      } else {
        return times;
      }
    };

    React.useEffect(() => {
      setAvailableTimes(getAvailableTimes(times, pickUpTime));
    }, [pickUpDate, pickUpTime, dropOffDate, getAvailableTimes, times]);

    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[170px] text-[#64748b]">
          <SelectValue placeholder="Виберіть час" />
        </SelectTrigger>
        <SelectContent ref={ref}>
          {availableTimes.map((time) => (
            <SelectItem
              key={time}
              value={time}
              className={"hover:cursor-pointer"}
            >
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

TimePicker.displayName = "TimePicker";
