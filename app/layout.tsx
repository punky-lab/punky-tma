import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Root } from "@/components/Root/Root";
import "normalize.css/normalize.css";
import "./globals.css";
import { Press_Start_2P } from "@next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Punky App TG",
  description: "Telegram endpoint of punky app",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
