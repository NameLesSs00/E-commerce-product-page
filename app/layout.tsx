import type { Metadata } from "next";
import "./globals.css";
import MyNav from "./components/MyNav";
import { AppContextProvider } from "@/app/components/AppContext";

export const metadata: Metadata = {
  title: "E-commerce product page",
  description: "I'm doing my best here, easy on me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body>
        <AppContextProvider>
          <MyNav />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
