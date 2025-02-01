import React from "react";
import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/components/ui/input";
import { ErrorText } from "../error-text";
import { EyeIcon } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, type, label, required, ...props }) => {
  const [inputType, setInputType] = React.useState(type || "text");
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const errotText = errors?.[name]?.message as string;

  const text = watch(name);

  const showPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md bg-white" {...register(name)} type={inputType} {...props} />
        {Boolean(text)}
        {type === "password" && (
          <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2" onClick={showPassword}>
            <EyeIcon />
          </button>
        )}
      </div>

      {errotText && <ErrorText text={errotText} />}
    </div>
  );
};
