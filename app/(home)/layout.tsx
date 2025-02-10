import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Головна",
  description: "Головна сторінка",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <main className={`antialiased min-h-screen`}>{children}</main>
    </>
  );
}
