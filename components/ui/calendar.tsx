"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { startOfDay, eachDayOfInterval } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
type Calendar = {
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
  selected: Date | undefined;
  defaultCellInCalendar?: boolean;
  onSelect: (date: Date | undefined) => void;
};

function Calendar({
  className,
  classNames,
  reservation,
  pickUpDate,
  selected,
  onSelect,
  showOutsideDays = true,
  defaultCellInCalendar,
  mode,
  ...props
}: Calendar & CalendarProps) {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 1);
  maxDate.setDate(today.getDate());

  const reserved = reservation
    ? reservation.flatMap((res) =>
        eachDayOfInterval({
          start: startOfDay(new Date(res.startDate)),
          end: startOfDay(new Date(res.endDate)),
        })
      )
    : [];

  const freeDays: Date[] = [];
  for (let d = new Date(today); d <= maxDate; d.setDate(d.getDate() + 1)) {
    const isReserved = reserved.some(
      (res) => res.toString() === startOfDay(d).toString()
    );

    if (!isReserved) {
      freeDays.push(new Date(d));
    }
  }

  const disabledDaysReserv = reservation
    ? reservation.flatMap((res) =>
        eachDayOfInterval({
          start: startOfDay(new Date(res.startDate)),
          end: startOfDay(new Date(res.endDate)),
        })
      )
    : [];

  const disabledDaysAfterReserv =
    pickUpDate && reservation
      ? (() => {
          const reservationIntervals = reservation.flatMap((res) =>
            eachDayOfInterval({
              start: startOfDay(new Date(res.startDate)),
              end: startOfDay(new Date(res.endDate)),
            })
          );

          if (!reservationIntervals.length) return [];

          for (const reservationDate of reservationIntervals) {
            if (startOfDay(pickUpDate) < reservationDate) {
              return [
                { before: startOfDay(pickUpDate) },
                {
                  after: new Date(
                    reservationDate.setDate(reservationDate.getDate() - 1)
                  ),
                },
              ];
            }
          }

          const nextReservationDate = reservationIntervals.find(
            (date) => date > pickUpDate
          );

          return nextReservationDate
            ? [
                { before: startOfDay(pickUpDate) },
                { after: nextReservationDate },
              ]
            : [{ before: startOfDay(pickUpDate) }];
        })()
      : [];

  const allDisabledDays = [
    { before: today, after: maxDate },
    ...disabledDaysReserv,
    ...disabledDaysAfterReserv,
  ];

  const handleDateSelect = (date: Date) => {
    if (onSelect) {
      if (pickUpDate && reservation) {
        const pickDateNormalize = startOfDay(pickUpDate);
        const isPrevDay = date.getTime() < pickDateNormalize.getTime();
        const isReserved = reserved.some(
          (res) => res.toDateString() === date.toDateString()
        );

        const isRangeReserv = reservation.some((res) => {
          const resStartDate = startOfDay(new Date(res.startDate));
          const resEndDate = startOfDay(new Date(res.endDate));
          // return resStartDate <= date && resEndDate >= date;
          return (
            (resStartDate <= date && resEndDate >= date) ||
            (resStartDate <= pickDateNormalize &&
              resEndDate >= pickDateNormalize) ||
            (pickDateNormalize <= resEndDate && date >= resStartDate)
          );
        });

        if (!isRangeReserv && !isPrevDay && !isReserved) {
          onSelect(date);
        }
      } else {
        const isReserved = reserved.some(
          (res) => res.toDateString() === date.toDateString()
        );
        if (!isReserved) {
          onSelect(date);
        }
      }
    }
  };

  return (
    <DayPicker
      mode="single"
      disabled={allDisabledDays}
      selected={selected}
      onDayClick={handleDateSelect}
      modifiers={
        defaultCellInCalendar === true
          ? {
              disabled: { before: today, after: maxDate },
            }
          : {
              free: freeDays,
              reserved: reserved || [],
              disabledAfterReserv: disabledDaysAfterReserv || [],
              disabled: { before: today, after: maxDate },
            }
      }
      modifiersClassNames={{
        free: "bg-green-300 ",
        reserved: "bg-red-300",
        disabled: "opacity-50",
        disabledAfterReserv: "opacity-50 ",
      }}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7  p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        //@ts-ignore
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
