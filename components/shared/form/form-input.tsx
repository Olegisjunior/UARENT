"use client";
import React from "react";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/components/ui/input";
import { ErrorText } from "../error-text";
import { EyeIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  type,
  label,
  required,
  ...props
}) => {
  const [inputType, setInputType] = React.useState(type || "text");

  const {
    control,
    formState: { errors },
    watch,
  } = useForm();

  const errorText = errors?.[name]?.message as string;

  const text = watch(name);

  const showPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  // return (
  //   <div className={className}>
  //     {label && (
  //       <p className="font-medium mb-2">
  //         {label} {required && <RequiredSymbol />}
  //       </p>
  //     )}

  //     <div className="relative">
  //       <Input
  //         autoComplete="on"
  //         id={`${name}`}
  //         className="h-12 text-md bg-white"
  //         {...register(name)}
  //         type={inputType}
  //         {...props}
  //       />
  //       {Boolean(text)}
  //       {type === "password" && (
  //         <button
  //           type="button"
  //           className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
  //           onClick={showPassword}
  //         >
  //           <EyeIcon />
  //         </button>
  //       )}
  //     </div>

  //     {errotText && <ErrorText text={errotText} />}
  //   </div>
  // );
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              {...field}
              autoComplete="on"
              id={name}
              className="h-12 text-md bg-white"
              type={inputType}
              {...props}
            />
          )}
        />
        {Boolean(text) && type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
            onClick={showPassword}
          >
            <EyeIcon />
          </button>
        )}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
