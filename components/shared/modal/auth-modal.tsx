"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/registration-form";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");
  const router = useRouter();

  const callbackUrl = typeof window !== "undefined" ? window.location.href : "";
  const handleClose = () => {
    onClose();
    router.refresh();
  };

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle />
      <DialogDescription />
      <DialogContent className="w-[350px] md:w-[500px] bg-[#f6f7f9] p-10">
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onSwitch={onSwitchType} onClose={handleClose} />
        )}

        <hr />

        <div className="flex gap-2">
          <Button
            variant={"outline"}
            onClick={() =>
              signIn("github", { callbackUrl: callbackUrl, redirect: true })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1 bg-white"
          >
            <img
              src="https://github.githubassets.com/favicons/favicon.svg"
              className="w-6 h-6"
            />
            GitHub
          </Button>

          <Button
            variant={"outline"}
            onClick={() =>
              signIn("google", { callbackUrl: callbackUrl, redirect: true })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1 bg-white"
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              className="w-6 h-6"
            />
            Google
          </Button>
        </div>

        <Button variant={"outline"} onClick={onSwitchType} className="h-12">
          {type !== "login" ? "Вхід" : "Реєстрація"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
