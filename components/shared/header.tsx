"use server";

import { HeaderGuts } from "./header-guts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return <HeaderGuts session={session} />;
};
