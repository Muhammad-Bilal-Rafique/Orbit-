import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import {Toaster} from "@/components/ui/sonner";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbit | Premium Store Control Center",
  description: "High-end minimalistic e-commerce ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider refetchOnWindowFocus={false}>
        {children}
        <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
