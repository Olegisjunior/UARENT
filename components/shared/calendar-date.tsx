"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { JsonValue } from "@prisma/client/runtime/library";

interface CalendarDateProps {
  value: Date | undefined;
  onChange: (value: string | undefined) => void;
  onBlur?: () => void;
  name?: string;
  reservation?:
    | {
        status: string;
        id: number;
        carId: number;
        startDate: Date;
        endDate: Date;
        startTime: string;
        endTime: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        customerId: string;
        cardNumber: string | null;
        expiryDate: string | null;
        cvv: string | null;
        paymentMethod: string;
        updatedAt: Date;
      }[]
    | undefined;
  pickUpDate?: Date;
}

export const CalendarDate: React.FC<CalendarDateProps> = ({ value, onChange, onBlur, name, reservation, pickUpDate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateSelect = (date: Date) => {
    const formattedDate = new Date(date);
    onChange(format(formattedDate, "yyyy-MM-dd"));
    onBlur?.();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("w-[170px] pl-3 text-left font-normal text-[#64748b]", !value && "text-muted-foreground")}>
          {value ? format(value, "PPP") : <span>Виберіть дату</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" required={true} hideWeekdays reservation={reservation} selected={value} onSelect={handleDateSelect} pickUpDate={pickUpDate} />
      </PopoverContent>
    </Popover>
  );
};
