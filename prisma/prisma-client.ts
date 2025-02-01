import { PrismaClient } from "@prisma/client";

// це все тупо копіпаст з доків\є

const prismaClient = () => {
  return new PrismaClient({});
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClient>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
