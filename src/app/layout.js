import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: "Patterson",
  description:
    "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
