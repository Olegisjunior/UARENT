"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "../container";
import { useRouter } from "next/navigation";
// import { encodeId } from "@/lib/hashids";
import { resetOrder } from "@/store/OrderSlice";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  carId: number;
  session: any;
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
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export const OrderForm: React.FC<Props> = ({ session, carId, reservation }) => {
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const dispatch = useDispatch();
  const orderDetails = useSelector((state: RootState) => state.order);
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    if(session) {
      setIsloading(false);
    }
  }, [session]);

  const router = useRouter();

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const handleFormSubmit = async (formData: FormData) => {
    const reservationData = {
      carId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      customerId: session.id,
      ...(formData.paymentMethod === "card" && {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      }),
      startDate: orderDetails.pickUpDate,
      endDate: orderDetails.dropOffDate,
      startTime: orderDetails.pickUpTime,
      endTime: orderDetails.dropOffTime,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        // const reservation = await response.json();
        alert(`Ваше замовлення створено! `);
        dispatch(resetOrder());
        console.log(`reset data's, data:` + reservationData);
        // const encryptedId = encodeId(reservation.id);
        router.push(`/reservation/`); //${encryptedId}
      } else {
        console.log(reservationData);
        const error = await response.json();
        console.error("Server Error:", error);
        resetOrder();
        alert(`Щось пішло не так: ${error.error}`);
      }
    } catch (error) {
      console.log(reservationData);
      resetOrder();
      console.error("Unexpected Error:", error);
      alert("Помилка з'єднання з сервером");
    }
  };

  return (
    <Container>
      {isLoading ? (<div className="space-y-4">
      <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-md my-2 w-full p-4">
        {["Ім'я", "Прізвище", "Email", "Телефон"].map((label, index) => (
          <div key={index} className="flex items-center gap-3 w-full">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-[600px] h-10 rounded" />
          </div>
        ))}
      </div>
      
      <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-md my-2 w-full p-4">
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-[600px] h-10 rounded" />
        </div>
        
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="w-full h-10 rounded" />
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            {["Номер карти", "Термін дії", "CVV"].map((label, index) => (
              <div key={index} className="flex items-center gap-3 w-full">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-[600px] h-10 rounded" />
              </div>
            ))}
          </div>
        </div>
        
        <Skeleton className="w-fit h-10 px-4 rounded bg-blue-500" />
      </div>
    </div>) : (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 ">
        <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-md my-2 w-full  p-4">
          <div className="flex items-center gap-3">
            <label className="w-32">Ім'я:</label>
            <div className="flex-1">
              <Input placeholder="Ім'я" {...register("firstName", { required: "Ім'я обов'язкове" })} type="text" className="w-[600px] p-2 border rounded" />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32">Прізвище:</label>
            <div className="flex-1">
              <Input placeholder="Прізвище" {...register("lastName", { required: "Прізвище обов'язкове" })} type="text" className="w-[600px] p-2 border rounded" />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32">Email:</label>
            <div className="flex-1">
              <Input
                placeholder="qwerty@gmail.com"
                {...register("email", {
                  required: "Email обов'язковий",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Невірний формат email",
                  },
                })}
                type="email"
                className="w-[600px] p-2 border rounded"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32">Телефон:</label>
            <div className="flex-1">
              <Input
                placeholder="+380123456789"
                {...register("phone", {
                  required: "Телефон обов'язковий",
                  pattern: {
                    value: /^\+?[0-9]{10,12}$/,
                    message: "Невірний формат телефону",
                  },
                  onChange: (e) => {
                    e.target.value = "+" + e.target.value.replace(/\D/g, "").slice(0, 12);
                  },
                })}
                type="tel"
                className="w-[600px] p-2 border rounded"
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-md my-2 w-full  p-4">
          <div className="flex items-center gap-3">
            <label className="w-32">Метод оплати:</label>
            <div className="flex-1">
              <select {...register("paymentMethod")} value={paymentMethod} onChange={handlePaymentMethodChange} className="w-[600px] p-2 border rounded">
                <option value="card" className="">
                  Банківська картка
                </option>
                <option value="cash" className="">
                  Готівка
                </option>
              </select>
            </div>
          </div>

          {paymentMethod === "card" ? (
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <div className="flex items-center gap-3">
                <label className="w-32">Номер карти:</label>
                <div className="flex-1">
                  <Input
                    placeholder="1111-2222-3333-4444"
                    {...register("cardNumber", {
                      required: "Номер карти обов'язковий",
                      pattern: {
                        value: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                        message: "Номер карти повинен містити 16 цифр, розділених дефісами",
                      },
                      onChange: (e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d{4})(?=\d)/g, "$1-")
                          .slice(0, 19);
                      },
                    })}
                    type="text"
                    maxLength={19}
                    className="w-[600px] p-2 border rounded"
                  />
                  {errors.cardNumber && <p className="text-red-500">{errors.cardNumber.message}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="w-32">Термін дії:</label>
                <div className="flex-1">
                  <Input
                    {...register("expiryDate", {
                      required: "Термін дії обов'язковий",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: "Формат ММ/РР",
                      },
                      onChange: (e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d{2})(?=\d)/g, "$1/")
                          .slice(0, 5);
                      },
                    })}
                    placeholder="MM/YY"
                    className="w-[600px] p-2 border rounded"
                  />
                  {errors.expiryDate && <p className="text-red-500">{errors.expiryDate.message}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="w-32">CVV:</label>
                <div className="flex-1">
                  <Input
                    placeholder="111"
                    {...register("cvv", {
                      required: "CVV обов'язковий",
                      pattern: {
                        value: /^[0-9]{3}$/,
                        message: "CVV повинен містити 3 цифри",
                      },
                      onChange: (e) => {
                        e.target.value = e.target.value.slice(0, 3);
                      },
                    })}
                    type="text"
                    maxLength={4}
                    className="w-[600px] p-2 border rounded"
                  />
                  {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
                </div>
              </div>
            </div>
          ) : null}

          <p className="text-sm text-gray-500">
            Щоб створити замовлення, заповніть всі поля форми вище.
          </p>
          <Button type="submit" disabled={orderDetails.pickUpLocation === null} className="w-fit p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Створити замовлення
          </Button>
        </div>
      </form>
      )}
    </Container>
  );
};
