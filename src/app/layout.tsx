import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/provider/redux";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800","900"]
})

export const metadata: Metadata = {
  title: "Scheduling App",
  description: "Scheduling App built with Next.js and Tailwind CSS for managing exams and schedules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Toaster/>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
