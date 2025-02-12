"use client";
import { Button } from "@/components/ui/button";
import { CircleDotIcon } from "lucide-react";
import React from "react";
import { CalendarDate } from "./calendar-date";
import { TimePicker } from "./time-picker";
import { useForm, Controller } from "react-hook-form";
import { SelectCity } from "./select-city";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "@/store/OrderSlice";
import { format, startOfDay } from "date-fns";
import { FormSkeleton } from "./form-skeleton";
import { toast } from "react-toastify";

type FormValues = {
  pickUpLocation: string;
  pickUpDate: Date;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: Date;
  dropOffTime: string;
};

type Props = {
  className?: string;
  className2?: string;
  defaultCellInCalendar?: boolean;
  isSubmitButton?: boolean;
  redirectData?: boolean;
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
  handleSubmitFormPickOrDrop?: (data: {
    dropOffDate: Date;
    dropOffTime: string;
    pickUpDate: Date;
    pickUpTime: string;
  }) => void;
};

type SubmitData = {
  dropOffDate: Date;
  dropOffLocation: string;
  dropOffTime: string;
  pickUpDate: Date;
  pickUpLocation: string;
  pickUpTime: string;
};

export const FormPickOrDrop: React.FC<Props> = ({
  className,
  isSubmitButton,
  reservation,
  redirectData,
  defaultCellInCalendar,
  handleSubmitFormPickOrDrop,
  className2,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({});

  React.useEffect(() => {
    if (router) {
      setIsLoading(false);
    }
  }, [isLoading, router]);

  const notify = () => toast.success("Дані збережені!");

  const onSubmit = (data: SubmitData, event?: React.BaseSyntheticEvent) => {
    const pickDate = new Date(
      data.pickUpDate + "T" + data.pickUpTime + ":00.000Z"
    );
    const dropDate = new Date(
      data.dropOffDate + "T" + data.dropOffTime + ":00.000Z"
    );

    if (redirectData === false) {
      event?.preventDefault();
      event?.stopPropagation();
      dispatch(
        setOrderDetails({
          pickUpLocation: data.pickUpLocation,
          pickUpDate: format(startOfDay(pickDate), "yyyy-MM-dd").toString(),
          pickUpTime: data.pickUpTime,
          dropOffLocation: data.dropOffLocation,
          dropOffDate: format(startOfDay(dropDate), "yyyy-MM-dd").toString(),
          dropOffTime: data.dropOffTime,
        })
      );
      handleSubmitFormPickOrDrop &&
        handleSubmitFormPickOrDrop({
          pickUpDate: data.pickUpDate,
          pickUpTime: data.pickUpTime,
          dropOffDate: data.dropOffDate,
          dropOffTime: data.dropOffTime,
        });
      notify();
    } else if (redirectData === true) {
      const LDT = new URLSearchParams({
        pick: pickDate.toISOString(),
        drop: dropDate.toISOString(),
      });

      router.push(`/cars?${LDT}`);
    }
  };

  const pickUpDate = watch("pickUpDate");
  const dropOffDate = watch("dropOffDate");
  const pickUpTime = watch("pickUpTime");

  return (
    <>
      {isLoading ? (
        <FormSkeleton isSubmitButton={isSubmitButton} />
      ) : (
        <form
          onSubmit={handleSubmit((data, event) => onSubmit(data, event))}
          className={className}
        >
          <div className="pick py-5 flex flex-col md:justify-stretch md:items-stretch justify-center items-center gap-3 px-2 bg-white rounded-md">
            <div className="flex gap-2 items-center flex-col lg:flex-row">
              <CircleDotIcon size={20} />
              <h1 className="font-bold">Взяти</h1>
              <span className="text-[#90A3BF] text-[14px]">
                (Ви можете брати в оренду не більше ніж місяць)
              </span>
            </div>
            <div className={`${className2} flex`}>
              <div className="flex flex-col items-start justify-center">
                <label className="font-semibold pl-3 text-lg">Локація</label>
                <Controller
                  name="pickUpLocation"
                  control={control}
                  rules={{ required: "Локація потрібна для вибору" }}
                  render={({ field }) => <SelectCity {...field} />}
                />
                {errors.pickUpLocation && (
                  <p className="text-red-500 text-[10px] my-2 mx-auto">
                    {errors.pickUpLocation.message}
                  </p>
                )}
              </div>
              <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px] hidden lg:inline-block"></div>

              <div className="w-[170px] flex flex-col items-start justify-center">
                <label className="font-semibold pl-3 text-lg">Дата</label>
                <Controller
                  name="pickUpDate"
                  control={control}
                  rules={{ required: "Дата потрібна для вибору" }}
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <CalendarDate
                      defaultCellInCalendar={defaultCellInCalendar}
                      reservation={reservation}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                    />
                  )}
                />
                {errors.pickUpDate && (
                  <p className="text-red-500 text-[10px] my-2 mx-auto">
                    {errors.pickUpDate.message}
                  </p>
                )}
              </div>
              <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px] hidden lg:inline-block"></div>

              <div className="w-[170px] flex flex-col items-start justify-center">
                <label className="font-semibold pl-3 text-lg">Час</label>
                <Controller
                  name="pickUpTime"
                  control={control}
                  rules={{ required: "Час потрібен для вибору" }}
                  render={({ field }) => (
                    <TimePicker {...field} pickUpDate={pickUpDate} />
                  )}
                />
                {errors.pickUpTime && (
                  <p className="text-red-500 text-[10px] my-2 mx-auto mr-10">
                    {errors.pickUpTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {isSubmitButton && (
            <Button type="submit" className="hidden lg:inline-block">
              <span>Шукати машину</span>
            </Button>
          )}

          <div className="pick py-5 flex flex-col md:justify-stretch md:items-stretch justify-center items-center gap-3 px-2 bg-white rounded-md">
            <div className="flex gap-2 items-center flex-col lg:flex-row">
              <CircleDotIcon size={20} />
              <h1 className="font-bold">Залишити</h1>
              <span className="text-[#90A3BF] text-[14px]">
                (Ви можете брати в оренду не більше ніж місяць)
              </span>
            </div>
            <div className={`${className2} flex`}>
              <div className="flex flex-col items-start justify-center">
                <label className="font-semibold pl-3 text-lg">Локація</label>
                <Controller
                  name="dropOffLocation"
                  control={control}
                  rules={{ required: "Локація потрібна для вибору" }}
                  render={({ field }) => <SelectCity {...field} />}
                />
                {errors.dropOffLocation && (
                  <p className="text-red-500 text-[10px] my-2 mx-auto">
                    {errors.dropOffLocation.message}
                  </p>
                )}
              </div>
              <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px] hidden lg:inline-block"></div>

              <div className="w-[170px] flex flex-col items-start justify-center">
                <label className="font-semibold pl-3 text-lg">Дата</label>
                <Controller
                  name="dropOffDate"
                  control={control}
                  rules={{ required: "Дата потрібна для вибору" }}
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <CalendarDate
                      defaultCellInCalendar={defaultCellInCalendar}
                      reservation={reservation}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                      pickUpDate={pickUpDate}
                    />
                  )}
                />
                {errors.dropOffDate && (
                  <p className="text-red-500 text-[10px] my-2 mx-auto">
                    {errors.dropOffDate.message}
                  </p>
                )}
              </div>
              <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px] hidden lg:inline-block"></div>

              <div className="w-[170px] flex flex-col items-start justify-center">
                <label className="font-semibold pl-3 text-lg">Час</label>
                <Controller
                  name="dropOffTime"
                  control={control}
                  rules={{ required: "Час потрібен для вибору" }}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      pickUpDate={pickUpDate}
                      pickUpTime={pickUpTime}
                      dropOffDate={dropOffDate}
                    />
                  )}
                />
                {errors.dropOffTime && (
                  <p className="text-red-500 text-[10px] my-2 mx-auto mr-10">
                    {errors.dropOffTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {!isSubmitButton && (
            <Button
              className="flex justify-center items-center w-[200px] "
              type="submit"
            >
              <span>Зберегти дані</span>
            </Button>
          )}

          {isSubmitButton && (
            <Button type="submit" className="inline-block lg:hidden">
              <span>Шукати машину</span>
            </Button>
          )}
        </form>
      )}
    </>
  );
};
