import localFont from "next/font/local";
import "./globals.css";
import { Footer, Header } from "@/components/shared";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/components/shared/provider";
import { StoreProvider } from "@/store/storeProvider";

const Roboto = localFont({
  src: "./fonts/Roboto.woff2",
  variable: "--font-Roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <link type="image/png" rel="icon" href="./favicon1.png" />
        <Providers>
          <body className={`${Roboto.variable} antialiased`}>
            <div className="bg-white mb-2 p-2 border-b w-full border-[#1A202C] border-opacity-40">
              <Header />
            </div>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {children}
            <div className="bg-white mt-8 p-2 border-t border-[#1A202C] border-opacity-40">
              <Footer />
            </div>
          </body>
        </Providers>
      </html>
    </StoreProvider>
  );
}
