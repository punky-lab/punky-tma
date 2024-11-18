import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Root } from "@/components/Root/Root";
import "normalize.css/normalize.css";
import "./globals.css";
import { Press_Start_2P } from "next/font/google";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          href="https://unpkg.com/nes.css@latest/css/nes.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
