"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
// import { StoreProvider } from "./store/StoreProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      {/* <StoreProvider></StoreProvider> */}
    </SessionProvider>
  );
};
